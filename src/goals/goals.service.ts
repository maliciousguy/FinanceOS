import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';

import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Injectable()
export class GoalsService {
  async createGoal(
    uid: string,
    createGoalDto: CreateGoalDto,
  ) {
    const docRef = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('goals')
      .add({
        ...createGoalDto,
        savedAmount: 0,
        createdAt: new Date(),
      });

    return {
      message: 'Goal created successfully',
      goalId: docRef.id,
    };
  }

  async getAllGoals(uid: string) {
    const snapshot = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('goals')
      .get();

    return snapshot.docs.map((doc) => ({
      goalId: doc.id,
      ...doc.data(),
    }));
  }

  async getGoalById(
    uid: string,
    id: string,
  ) {
    const doc = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('goals')
      .doc(id)
      .get();

    return {
      goalId: doc.id,
      ...doc.data(),
    };
  }

  async updateGoal(
    uid: string,
    id: string,
    updateGoalDto: UpdateGoalDto,
  ) {
    await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('goals')
      .doc(id)
      .update(updateGoalDto);

    return {
      message: 'Goal updated successfully',
      goalId: id,
    };
  }

  async deleteGoal(
    uid: string,
    id: string,
  ) {
    await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('goals')
      .doc(id)
      .delete();

    return {
      message: 'Goal deleted successfully',
      goalId: id,
    };
  }
}