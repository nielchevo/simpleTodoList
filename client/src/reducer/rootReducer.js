import dummyData from '../dummyData';

const initialState = {
   todos: dummyData.todos,
   isPublic : 'test2'
}

export default function rootReducer(state = initialState, action) {
   console.log('[TodosReducer Dispatcher] Action: ' + action.type);
   
   switch (action.type) {

      case 'ADD_TODO':
         console.log('ADD TODOto redux state');
         break;
      case 'DELETE_TODO':
         console.log('DELETE TODO to redux state');
         break;
      case 'UPDATE_TODO': 
         console.log('UPDATE TODO To redux state');
         break;
      default:
         console.log('Default reducer state');
         return state;
   }
}