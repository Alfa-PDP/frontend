import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { yearActions } from '../store/alfa/year.slice';
import { userActions } from '../store/alfa/user.slice';
import { infoMessageActions } from '../store/alfa/infoMessage.slice';

const actions = {
  ...yearActions,
  ...userActions,
  ...infoMessageActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
