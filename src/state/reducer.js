import { disable, enable, updateObject, initializeLogs, addLogPoint,
  toggleHover, INITIAL_STATE, setObject } from './actions';


// reference state tree syntax

// export const INITIAL_STATE = fromJS(
//   {
//     scale: {
//       minX: -0.05,
//       maxX: 20,
//       minY: -0.001,
//       maxY: 0.5,
//     },
//     scaleMenu: false,
//     noAutoUpdate: false,
//     scaling: false,
//     anchors: {x: null, y: null},
//     size: {
//       width: 1000,
//       height: 600,
//     },
//     logs: {
//       // modelA: {
//       //   validLoss: {
//       //     indices: [],
//       //     values: [],
//       //   }
//       // }
//     },
//     hovering: false,
//     hoverPosition: {
//       hoverX: 0,
//       hoverY: 0,
//     },
//     disabled: {
//       models: {},
//       series: {},
//       uniques: {},
//     },
//   }
// );


export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'RESCALE':
      return updateObject(state, 'scale', action.scale);
    case 'TOGGLE_SCALE_MENU':
      return state.update('scaleMenu', bool => !bool);
    case 'TOGGLE_AUTO_UPDATE':
      return state.update('noAutoUpdate', bool => !bool);
    case 'SET_DRAG':
      return state.update('dragging', () => action.value);
    case 'SET_ANCHORS':
      return setObject(state, 'anchors', action.anchors);
    case 'RESIZE':
      return updateObject(state, 'size', action.size);
    case 'MOVE_HOVER':
      return updateObject(state, 'hoverPosition', action.coords);
    case 'DISABLE':
      return disable(state, action.category, action.id);
    case 'ENABLE':
      return enable(state, action.category, action.id);
    case 'TOGGLE_HOVER':
      return toggleHover(state, action.value);
    case 'INITIALIZE_LOGS':
      return initializeLogs(state, action.logs);
    case 'UPDATE_MODEL':
      return addLogPoint(state, action.modelName, action.seriesName,
          action.index, action.value);
    case 'DELETE':
      return state.deleteIn(['logs', action.modelName, action.seriesName]);
    case 'DELETEMODEL':
	    return state.deleteIn(['logs', action.modelName]);
    default:
      return state;
  }
}
