import { useSelector, useDispatch } from 'react-redux';
import { changeColor } from '@reduxStore/actions';
import { SketchPicker } from 'react-color';
import { get } from 'lodash';
import constants from '@constants';
import { localForage } from '@utils';

const ColorPickerMain = () => {
  const dispatch = useDispatch();

  const handleChangeColor = (hex) => {
    dispatch(changeColor(hex));
    localForage.setItem(constants.LOCAL_FORAGE_KEYS.COLOR, hex);
  };

  const { color } = useSelector((state) => {
    return {
      color: get(state, 'common.color', {})
    };
  });

  return <SketchPicker color={color} onChangeComplete={handleChangeColor} />;
};

export default ColorPickerMain;
