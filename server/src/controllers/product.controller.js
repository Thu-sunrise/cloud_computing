// fix undefined (hạn chế undefined)
// fix url bằng cách sử dụng hàm sinh url
// gộp (Paging countTotalProduct và pagingTotalProduct) thành 1 service trả 2 tham số

import { asyncHandler } from "../utils/asyncHandler.js";
import { ProductService } from "../services/product.service.js";
import { CloudinaryService } from "../services/cloudinary.service.js";

/**
 * @route GET api/product/:id
 * @desc Get a product by ID
 */
export const getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await ProductService.getProductById(id);
  return res.status(200).json({ data: product });
});

/**
 * @route POST /api/product/
 * @desc Create a new product.
 *       - Requires authentication throught auth.middleware
 *       - The product's 'createdBy' is automatically set from req.user.sub
 *       - The 'status' field defaults to "pending" (check it out)
 */
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;
  const getPrice = Number(price);
  let salePrice = undefined;
  if (req.body.salePrice) {
    salePrice = req.body.salePrice;
    salePrice = Number(salePrice);
  }
  const createdBy = req.user.sub;
  // Handle image uploads to Cloudinary
  let images = [];
  if (req.files.length !== 0) {
    for (const file of req.files) {
      try {
        const uploadResult = await CloudinaryService.uploadFile(file, "products");
        const url = CloudinaryService.generateSignedUrl(uploadResult.public_id);
        images.push({
          url: url,
          publicId: uploadResult.public_id,
          resource_type: uploadResult.resource_type,
        });
      } catch (err) {
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }
  }

  const newProduct = await ProductService.createProduct({
    createdBy,
    name: name,
    description: description,
    price: getPrice,
    salePrice,
    images,
  });

  return res.status(201).json({
    message: "Product created successfully",
    data: newProduct,
  });
});

/**
 * @route PUT /api/product/list
 * @desc Updating Product information
 *       - getDeletedImages hold a list of NeedToBeRemoved-PublicID of Images
 *        of a specific product
 *       - keepImages along with updatedImages will be updated to the product
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const thisUserRole = req.user.role;
  const id = req.params.id;
  const product = await ProductService.getProductById(id);
  const { name, description, price, status } = req.body;
  let getPrice;
  if (price) getPrice = Number(price);
  if (status && thisUserRole != "admin") {
    return res.status(403).json({ message: "Action not allowed" });
  }

  // Parse deleted images
  let getDeletedImages = [];
  if (req.body.deletedImages) {
    getDeletedImages = JSON.parse(req.body.deletedImages);
  }

  // KeepImages Keeps images do not match in getDeletedImages
  const keepImages = product.images.filter((img) => !getDeletedImages.includes(img.publicId));
  // Delete from Cloudiary
  for (const publicId of getDeletedImages) {
    await CloudinaryService.deleteFile(publicId);
  }
  const updatedImages = [...keepImages];
  // If there are new images needed to be updated
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const uploadResult = await CloudinaryService.uploadFile(file, "products");
      updatedImages.push({
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        resource_type: uploadResult.resource_type,
      });
    }
  }
  const updateProduct = await ProductService.updateProduct(
    product,
    {
      name,
      description,
      price: getPrice,
      salePrice: req.body.salePrice || undefined,
      images: updatedImages,
    },
    thisUserRole,
    status
  );

  return res.json({
    message: "Product updated successfully",
    data: updateProduct,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await ProductService.getProductById(id);

  // Delete Images from Cloudinary
  const imagesToDelete = (product.images || []).map((img) => img.publicId);
  for (const publicId of imagesToDelete) {
    try {
      await CloudinaryService.deleteFile(publicId);
    } catch (err) {
      return res.status(500).json({ message: "Failed to delete image" });
    }
  }
  // Delete Product from Mongo
  const deletedProduct = await ProductService.deleteProduct(id);

  return res.status(200).json({ message: "Product Deleted Successfully" });
});

/**
 * @route GET /api/product/list
 * @desc Get a paginated list of products with optional search, filter, and sorting
 *       - Using filter for filtering appropriate products
 *       - Then, paging on filtered products accroding to the provided Condition in query params
 */
export const getListProducts = asyncHandler(async (req, res) => {
  // Parse query params
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;
  const search = req.query.search || "";
  const sortOrder = req.query.sort === "desc" ? -1 : 1; // default ascending
  const category = req.query.category;
  const priceMin = req.query.priceMin ? Number(req.query.priceMin) : 0;
  const priceMax = req.query.priceMax ? Number(req.query.priceMax) : 2000;

  // Dynamic Filter for querying into Mongo
  const filter = {};
  if (search) {
    filter.name = { $regex: search, $options: "i" }; // case of searching by name
  }
  if (category) {
    filter.category = category;
  }
  filter.price = { $gte: priceMin, $lte: priceMax };

  // Paging Product
  const totalProducts = await ProductService.countTotalProduct(filter);
  // Fetch products with pagination and sorting
  const pagingProduct = await ProductService.pagingTotalProduct(filter, sortOrder, skip, limit);

  return res.status(200).json({
    page,
    limit,
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    data: pagingProduct,
  });
});
