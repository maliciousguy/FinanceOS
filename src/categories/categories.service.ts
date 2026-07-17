import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  async createCategory(
    uid: string,
    createCategoryDto: CreateCategoryDto,
  ) {
    const docRef = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('categories')
      .add({
        ...createCategoryDto,
        createdAt: new Date(),
      });

    return {
      message: 'Category created successfully',
      categoryId: docRef.id,
    };
  }

  async getAllCategories(uid: string) {
    const snapshot = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('categories')
      .get();

    return snapshot.docs.map((doc) => ({
      categoryId: doc.id,
      ...doc.data(),
    }));
  }

  async updateCategory(
    uid: string,
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('categories')
      .doc(id)
      .update(updateCategoryDto);

    return {
      message: 'Category updated successfully',
      categoryId: id,
    };
  }

  async deleteCategory(
    uid: string,
    id: string,
  ) {
    await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('categories')
      .doc(id)
      .delete();

    return {
      message: 'Category deleted successfully',
      categoryId: id,
    };
  }
}