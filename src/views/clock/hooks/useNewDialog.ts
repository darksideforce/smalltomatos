import useDialog from '@/components/fullScreenDialog';
import MyDialog from '@/components/fullScreenDialog/dialog.vue';
import addMission from '../modules/addMission.vue';
const useMyDialog = () => {
  const dialog = useDialog(MyDialog);
  const openDialog = (options: {
    onClose?: () => void,
    onCancel?: () => void
  }) => {
    return dialog({
      visible: true, 
      onClose: () => {
      },
      width:'100vm',
      height:'100vh',
      slot:addMission
    });
  };
  const closeDialog = ()=>{

  }
  return { 
    openDialog ,
    closeDialog
  };
};

export default useMyDialog;