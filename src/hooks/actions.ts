import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { yearActions } from '../store/alfa/year.slice';
import { userActions } from '../store/alfa/user.slice';
import { infoMessageActions } from '../store/alfa/infoMessage.slice';
import { goalsActions } from '../store/alfa/goals.slice';

const actions = {
  ...yearActions,
  ...userActions,
  ...goalsActions,
  ...infoMessageActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
