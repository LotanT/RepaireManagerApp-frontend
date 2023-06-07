import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetNotesQuery } from './NotesApiSlice';
import { useGetUsersQuery } from '../users/usersApiSlice';
import EditNoteForm from './EditNoteForm';
import useAuth from '../../hooks/useAuth';
import PulseLoader from 'react-spinners/PulseLoader';

const EditNote = () => {
  const { id } = useParams();
  const { username, isAdmin, isManager } = useAuth();

  const { note } = useGetNotesQuery('noteList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });
  const { users } = useGetUsersQuery('userList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users?.length) return <PulseLoader color={'#fff'} />;

  if (!isAdmin || !isManager) {
    if (username === users.find((user) => user.id === note.user)?.username)
      return <p>No access</p>;
  }

  const content = <EditNoteForm note={note} users={users} />;
  return content;
};

export default EditNote;
