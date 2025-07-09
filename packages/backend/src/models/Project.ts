import { Schema, model, Document, Types } from 'mongoose';

export interface IProject extends Document {
  name: string;
  status: 'New' | 'InProgress' | 'Sold';
  ownerId: string;
}

const projectSchema = new Schema<IProject>(
  {
    name:      { type: String, required: true },
    status:    { type: String, enum: ['New','InProgress','Sold'], default: 'New' },
    ownerId:   { type: String, required: true }
  },
  { timestamps: true }
);

export const Project = model<IProject>('Project', projectSchema);