import styles from './styles.module.scss';
import Collapse from '../Collapse';

interface TextAttributesProps {
  developmentGoal?: string;
  strengths?: string;
  developmentZones?: string;
}

const dataAttributes: TextAttributesProps = {
  developmentGoal:
    'Хочу вырасти до Middle уровня, принять участие в большом проекте, обучиться тайммингу. Хочу вырасти до Senior.',
  strengths:
    'Легко нахожу контакт с людьми, умею слушать оппонента, трудолюбива. Умею разбивать большие задачи на маленькие Кусочки и решать их. Заинтересована в своем повышении. Проактивна, всегда помогу коллегам в рамках своей компетенции.',
  developmentZones: '',
};

export default function ProfessionalAttributes() {
  return (
    <section className={styles.professionalAttributes}>
      <Collapse
        textAttributes={dataAttributes.developmentGoal || ''}
        attributeName="Цели развития"
      />
      <Collapse
        textAttributes={dataAttributes.strengths || ''}
        attributeName="Сильные стороны"
      />
      <Collapse
        textAttributes={dataAttributes.developmentZones || ''}
        attributeName="Зоны развития"
      />
    </section>
  );
}
