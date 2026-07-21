import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class ReceiptsService {
  async uploadReceipt(
    uid: string,
    transactionId: string,
    file: Express.Multer.File,
  ) {
    const docRef = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('receipts')
      .add({
        transactionId,
        fileName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        uploadedAt: new Date(),
      });

    return {
      message: 'Receipt uploaded successfully',
      receiptId: docRef.id,
      fileName: file.originalname,
    };
  }
}