/* eslint-disable @typescript-eslint/no-explicit-any */

import { SelectDesktop } from '@alfalab/core-components/select/desktop';
import { BaseOption } from '@alfalab/core-components/select/shared';

const OPTIONS = [
  { key: '2024', content: '2024' },
  { key: '2023', content: '2023' },
  { key: '2022', content: '2022' },
  { key: '2021', content: '2021' },
];

export default function YearFilter() {
  return (
    <div style={{ width: 150, alignSelf: 'flex-end' }}>
      <SelectDesktop
        allowUnselect
        size="m"
        options={OPTIONS}
        label="Период"
        Option={BaseOption}
        block
      />
    </div>
  );
}

// import { PeriodSlider } from '@alfalab/core-components/calendar/components/period-slider';
// import { useState } from 'react';

// export default function YearFilter() {
//   const [values, setValues] = useState({
//     value: new Date(),
//     valueFrom: new Date(),
//     valueTo: new Date(),
//   });

//   const handler = (
//     _event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//     newValues: any
//   ) => setValues(newValues);

//   return (
//     <div style={{ width: 170, alignSelf: 'flex-end' }}>
//       <PeriodSlider
//         value={values.value}
//         periodType="year"
//         onPrevArrowClick={handler}
//         onNextArrowClick={handler}
//       />
//     </div>
//   );
// }
