import { Schema, model, Document, Types } from 'mongoose';

export interface IProject extends Document {
  name: string;
  status: 'New' | 'InProgress' | 'Sold';
  ownerId: Types.ObjectId;
}

const projectSchema = new Schema<IProject>(
  {
    name:      { type: String, required: true },
    status:    { type: String, enum: ['New','InProgress','Sold'], default: 'New' },
    ownerId:   { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export const Project = model<IProject>('Project', projectSchema);