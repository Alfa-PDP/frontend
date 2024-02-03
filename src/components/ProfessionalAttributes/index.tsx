import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Collapse from '../Collapse';
import { useGetUserGoalQuery } from '../../store/alfa/alfa.api';

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
  const [goalsId, setGoalsId] = useState('');
  const { data: goals } = useGetUserGoalQuery({ user_id: id || '' });

  useEffect(() => {
    if (goals) {
      setGoalsId(goals.id);
      console.log(goals);
    }
  }, [goals]);

  return (
    <section className={styles.professionalAttributes}>
      {goals && (
        <>
          <Collapse
            textAttributes={goals.goal_name || ''}
            attributeName="Цели развития"
            role={role}
            goalsId={goalsId}
            queryName="goal_name"
          />
          <Collapse
            textAttributes={goals.employee_side_plus || ''}
            attributeName="Сильные стороны"
            role={role}
            goalsId={goalsId}
            queryName="employee_side_plus"
          />
          <Collapse
            textAttributes={goals.employee_side_minus || ''}
            attributeName="Зоны развития"
            role={role}
            goalsId={goalsId}
            queryName="employee_side_minus"
          />
        </>
      )}
    </section>
  );
}
