'use client';

import { Settings } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/app/components/common/Button';
import { Dropdown } from '@/app/components/common/Dropdown';
import { w } from '@/utils/w';
import { GridTemplate, usePreferencesStore } from '@/stores/PreferencesStore';
import { DebugEnvironment } from '@/app/components/DebugEnvironment';

const gridTemplateLabel: Record<GridTemplate, string> = {
  grid: 'Por Grades',
  row: 'Por Linhas',
};

export function HeaderSettings() {
  const {
    showFeedbackPopup,
    setShowFeedbackPopup,
    showSocketsSection,
    setShowSocketsSection,
    showDebugPanel,
    setShowDebugPanel,
    gridTemplate,
    setGridTemplate,
  } = usePreferencesStore();

  const [isOpened, setIsOpened] = useState(false);

  return (
    <Dropdown.Root open={isOpened} onOpenChange={setIsOpened}>
      <Dropdown.Trigger asChild>
        <Button variant="ghost-with-background" className={w(isOpened && 'cursor-default bg-black/20 text-white')}>
          <Settings data-open={isOpened} className="h-5 w-5 transition-transform data-[open=true]:rotate-180" />
        </Button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.CheckboxItem checked={showFeedbackPopup} onCheckedChange={setShowFeedbackPopup}>
          <Dropdown.ItemIndicator iconType="check" />
          Exibir Feedback
        </Dropdown.CheckboxItem>

        <DebugEnvironment>
          <Dropdown.CheckboxItem checked={showSocketsSection} onCheckedChange={setShowSocketsSection}>
            <Dropdown.ItemIndicator iconType="check" />
            Exibir Sockets
          </Dropdown.CheckboxItem>

          <Dropdown.CheckboxItem checked={showDebugPanel} onCheckedChange={setShowDebugPanel}>
            <Dropdown.ItemIndicator iconType="check" />
            Exibir Dev Panel
          </Dropdown.CheckboxItem>

          <Dropdown.Separator />

          <Dropdown.Label hasItemIndicator>Ordenar enquetes</Dropdown.Label>

          <Dropdown.RadioGroup
            value={gridTemplate}
            onValueChange={(gridTemplate) => setGridTemplate(gridTemplate as GridTemplate)}
          >
            {Object.entries(gridTemplateLabel).map(([value, label]) => (
              <Dropdown.RadioItem key={value} value={value}>
                <Dropdown.ItemIndicator iconType="radio" />
                {label}
              </Dropdown.RadioItem>
            ))}
          </Dropdown.RadioGroup>
        </DebugEnvironment>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
