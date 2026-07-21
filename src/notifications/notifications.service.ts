import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';

import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  async createNotification(
    uid: string,
    createNotificationDto: CreateNotificationDto,
  ) {
    const docRef = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('notifications')
      .add({
        ...createNotificationDto,
        createdAt: new Date(),
      });

    return {
      message: 'Notification created successfully',
      notificationId: docRef.id,
    };
  }

  async getAllNotifications(uid: string) {
    const snapshot = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('notifications')
      .get();

    return snapshot.docs.map((doc) => ({
      notificationId: doc.id,
      ...doc.data(),
    }));
  }
}