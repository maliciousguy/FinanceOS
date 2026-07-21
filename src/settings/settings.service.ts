import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';

import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  async getSettings(uid: string) {
    const doc = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('settings')
      .doc('preferences')
      .get();

    if (!doc.exists) {
      return {
        darkMode: false,
        notificationsEnabled: true,
        currency: 'INR',
      };
    }

    return doc.data();
  }

  async updateSettings(
    uid: string,
    updateSettingsDto: UpdateSettingsDto,
  ) {
    await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('settings')
      .doc('preferences')
      .set(updateSettingsDto, {
        merge: true,
      });

    return {
      message: 'Settings updated successfully',
    };
  }
}