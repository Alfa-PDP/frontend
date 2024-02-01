import styles from './styles.module.scss';
import Collapse from '../Collapse';

interface TextAttributesProps {
  developmentGoal?: string;
  strengths?: string;
  developmentZones?: string;
}

const dataAttributes: TextAttributesProps = {
  developmentGoal:
    'Хочу вырасти до Middle уровня, принять участие в большом проекте, обучиться таймI',
  strengths:
    'Легко нахожу контакт с людьми, умею слушать оппонента, трудолюбива. Умею разбивать большие задачи на маленькие Кусочки и решать их. Заинтересована в своем повышении. Проактивна, всегда помогу коллегам в рамках своей компетенции. Легко нахожу контакт с людьми, умею слушать оппонента, трудолюбива. Умею разбивать большие задачи на маленькие Кусочки и решать их. Заинтересована в своем повышении. Проактивна, всегда помогу коллегам в рамках своей компетенции.',
  developmentZones: '',

  // Уточнить названия плейсхолдеров для каждых полей у сотрудника.

  // const placeholderText = {
  //   developmentGoalEmployee: '',
  //   strengthsEmployee: '',
  //   developmentZonesEmployee:
  //     'Области, в которых вы хотите развиваться и достичь новых высот в своей карьере.',
  // };
};

export default function ProfessionalAttributes({ role }: { role: string }) {
  return (
    <section className={styles.professionalAttributes}>
      <Collapse
        textAttributes={dataAttributes.developmentGoal || ''}
        attributeName="Цели развития"
        role={role}
      />
      <Collapse
        textAttributes={dataAttributes.strengths || ''}
        attributeName="Сильные стороны"
        role={role}
      />
      <Collapse
        textAttributes={dataAttributes.developmentZones || ''}
        attributeName="Зоны развития"
        role={role}
      />
    </section>
  );
}
