import type { IRecord } from '@teable-group/core';
import { useToast } from '@teable-group/ui-lib';
import { type FC, type PropsWithChildren } from 'react';
import { useLocalStorage } from 'react-use';
import { AnchorProvider, ViewProvider } from '../../context';
import { useTableId } from '../../hooks';
import { ExpandRecord } from './ExpandRecord';
import type { IExpandRecordModel } from './type';

const Wrap: FC<PropsWithChildren<{ tableId: string }>> = (props) => {
  const { tableId, children } = props;
  const currentTableId = useTableId();

  if (tableId !== currentTableId) {
    return (
      <AnchorProvider tableId={tableId}>
        <ViewProvider>{children}</ViewProvider>
      </AnchorProvider>
    );
  }
  return <>{children}</>;
};

interface IExpandRecorderProps {
  tableId: string;
  viewId?: string;
  recordId?: string;
  recordIds?: string[];
  model?: IExpandRecordModel;
  serverData?: IRecord;
  onClose?: () => void;
  onUpdateRecordIdCallback?: (recordId: string) => void;
}

export const ExpandRecorder = (props: IExpandRecorderProps) => {
  const { model, tableId, recordId, recordIds, serverData, onClose, onUpdateRecordIdCallback } =
    props;
  const { toast } = useToast();
  const [showActivity, setShowActivity] = useLocalStorage<boolean>('showActivity', true);

  if (!recordId) {
    return <></>;
  }

  const updateCurrentRecordId = (recordId: string) => {
    onUpdateRecordIdCallback?.(recordId);
  };

  const onCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({ description: 'Copy to clipboard' });
  };

  const onShowActivity = () => {
    setShowActivity(!showActivity);
  };

  return (
    <div id={`${tableId}-${recordId}`}>
      <Wrap tableId={tableId}>
        <ExpandRecord
          visible
          model={model}
          recordId={recordId}
          recordIds={recordIds}
          serverData={serverData?.id === recordId ? serverData : undefined}
          showActivity={showActivity}
          onClose={onClose}
          onPrev={updateCurrentRecordId}
          onNext={updateCurrentRecordId}
          onCopyUrl={onCopyUrl}
          onShowActivity={onShowActivity}
        />
      </Wrap>
    </div>
  );
};