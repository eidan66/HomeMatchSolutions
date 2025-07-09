import React, { useState } from 'react';
import {
  createProject,
  updateProject,
} from '../api/projects';
import type { Project } from '../api/projects';
import { Button } from '@/components/ui/button';
import {
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

type FormProps = {
  project?: Project;
  onSaved: (proj: Project) => void;
  onClose: () => void;
};

export const ProjectForm = ({ project, onSaved, onClose }: FormProps) => {
  const [name, setName] = useState(project?.name || '');
  const [ownerId, setOwnerId] = useState(project?.ownerId || '');
  const [status, setStatus] = useState<Project['status']>(project?.status || 'New');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const saved = project
        ? await updateProject(project._id, { name, status })
        : await createProject({ name, ownerId });
      onSaved(saved);
      onClose();
    } catch (err: any) {
      console.error(err);
      alert('Error saving project: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="mt-1 w-full"
        />
      </div>
      {!project && (
        <div>
          <label className="block text-sm font-medium">Owner ID</label>
          <Input
            value={ownerId}
            onChange={e => setOwnerId(e.target.value)}
            required
            className="mt-1 w-full"
          />
        </div>
      )}
      {project && (
        <div>
          <label className="block text-sm font-medium">Status</label>
          <Select value={status} onValueChange={val => setStatus(val as any)}>
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="InProgress">InProgress</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <DialogFooter className="flex justify-end space-x-2">
        <DialogClose asChild>
          <Button variant="outline" disabled={saving}>Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </DialogFooter>
    </form>
  );
}