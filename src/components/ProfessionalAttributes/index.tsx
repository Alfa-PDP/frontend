import { Loader } from '@alfalab/core-components/loader';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './styles.module.scss';
import Collapse from '../Collapse';
import { useGetUserGoalQuery } from '../../store/alfa/alfa.api';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';

// interface TextAttributesProps {
//   developmentGoal?: string;
//   strengths?: string;
//   developmentZones?: string;
// }

// const dataAttributes: TextAttributesProps = {
//   developmentGoal:
//     'Хочу вырасти до Middle уровня, принять участие в большом проекте, обучиться таймI',
//   strengths:
//     'Легко нахожу контакт с людьми, умею слушать оппонента, трудолюбива. Умею разбивать большие задачи на маленькие Кусочки и решать их. Заинтересована в своем повышении. Проактивна, всегда помогу коллегам в рамках своей компетенции. Легко нахожу контакт с людьми, умею слушать оппонента, трудолюбива. Умею разбивать большие задачи на маленькие Кусочки и решать их. Заинтересована в своем повышении. Проактивна, всегда помогу коллегам в рамках своей компетенции.',
//   developmentZones: '',

// Уточнить названия плейсхолдеров для каждых полей у сотрудника.

// const placeholderText = {
//   developmentGoalEmployee: '',
//   strengthsEmployee: '',
//   developmentZonesEmployee:
//     'Области, в которых вы хотите развиваться и достичь новых высот в своей карьере.',
// };
// };

export default function ProfessionalAttributes({ role }: { role: string }) {
  const { id } = useParams();
  const { data: goals, isLoading } = useGetUserGoalQuery({ user_id: id || '' });
  const { setGoals } = useActions();
  const goalsText = useAppSelector((state) => state.goals);

  useEffect(() => {
    if (goals) {
      setGoals(goals);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goals]);

  return (
    <section className={styles.professionalAttributes}>
      {goalsText.id && !isLoading ? (
        <>
          <Collapse
            textAttributes={goalsText.goal_name || ''}
            attributeName="Цели развития"
            role={role}
            goalsId={goalsText.id}
            queryName="goal_name"
          />
          <Collapse
            textAttributes={goalsText.employee_side_plus || ''}
            attributeName="Сильные стороны"
            role={role}
            goalsId={goalsText.id}
            queryName="employee_side_plus"
          />
          <Collapse
            textAttributes={goalsText.employee_side_minus || ''}
            attributeName="Зоны развития"
            role={role}
            goalsId={goalsText.id}
            queryName="employee_side_minus"
          />
        </>
      ) : (
        <div className={styles.professionalAttributes__loader}>
          <Loader />
        </div>
      )}
    </section>
  );
}
