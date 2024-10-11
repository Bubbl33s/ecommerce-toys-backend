import prisma from "./prisma";

type ProductData = {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  brandId: string;
  materialId?: string;
  discountId?: string;
};

export class ProductService {
  static async getProducts() {
    return prisma.product.findMany({
      include: {
        category: true,
        images: true,
        brand: true,
        material: true,
        discount: true,
      },
    });
  }

  static async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
        brand: true,
        material: true,
        discount: true,
      },
    });
  }

  static async createProduct(data: ProductData) {
    // Verify that the category and brand exist
    const categoryExists = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!categoryExists) {
      throw new Error("No existe una categoría con ese ID");
    }

    const brandExists = await prisma.brand.findUnique({
      where: { id: data.brandId },
    });

    if (!brandExists) {
      throw new Error("No existe una marca con ese ID");
    }

    // Verify that the material and discount exists, if not just set them to null
    if (data.materialId) {
      const materialExists = await prisma.material.findUnique({
        where: { id: data.materialId },
      });

      if (!materialExists) {
        delete data.materialId;
      }
    }

    if (data.discountId) {
      const discountExists = await prisma.discount.findUnique({
        where: { id: data.discountId },
      });

      if (!discountExists) {
        delete data.discountId;
      }
    }

    return prisma.product.create({ data });
  }

  static async updateProduct(id: string, data: ProductData) {
    // Verify that the product exists
    const productExists = await this.getProductById(id);

    if (!productExists) {
      throw new Error("No existe un producto con ese ID");
    }

    // Verify that the category and brand exist
    if (data.categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: data.categoryId },
      });

      if (!categoryExists) {
        throw new Error("No existe una categoría con ese ID");
      }
    }

    if (data.brandId) {
      const brandExists = await prisma.brand.findUnique({
        where: { id: data.brandId },
      });

      if (!brandExists) {
        throw new Error("No existe una marca con ese ID");
      }
    }

    // Verify that the material and discount exists, if not just set them to null
    if (data.materialId) {
      const materialExists = await prisma.material.findUnique({
        where: { id: data.materialId },
      });

      if (!materialExists) {
        delete data.materialId;
      }
    }

    if (data.discountId) {
      const discountExists = await prisma.discount.findUnique({
        where: { id: data.discountId },
      });

      if (!discountExists) {
        delete data.discountId;
      }
    }

    return prisma.product.update({
      where: { id },
      data,
    });
  }

  static async updateProductStock(id: string, quantity: number) {
    const productExists = await this.getProductById(id);

    if (!productExists) {
      throw new Error("No existe un producto con ese ID");
    }

    const newStock = productExists.stock + quantity;

    if (newStock < 0) {
      throw new Error("No hay suficiente stock");
    }

    return prisma.product.update({
      where: { id },
      data: { stock: newStock },
    });
  }

  static async activateProduct(id: string) {
    const productExists = await this.getProductById(id);

    if (!productExists) {
      throw new Error("No existe un producto con ese ID");
    }

    return prisma.product.update({
      where: { id },
      data: { isDeleted: false },
    });
  }

  static async deactivateProduct(id: string) {
    const productExists = await this.getProductById(id);

    if (!productExists) {
      throw new Error("No existe un producto con ese ID");
    }

    return prisma.product.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  static async deleteProduct(id: string) {
    const productExists = await this.getProductById(id);

    if (!productExists) {
      throw new Error("No existe un producto con ese ID");
    }

    return prisma.product.delete({
      where: { id },
    });
  }
}
