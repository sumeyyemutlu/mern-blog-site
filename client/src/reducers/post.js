import * as types from "../actions/types";

const initialState = {//anlık state bilgisini verdik. burası defult state
    posts: [],
    currentPost: null,
}

const postReducer = (state= initialState, action)=> {
    switch (action.type) {
        case types.FETCH_POSTS:
          return {
              ...state,//default state'in kopyasını al
              posts: action.payload //ve actionun payloadını ekle
          };
          case types.FETCH_SINGLE_POST:
            return {
                ...state,//default state'in kopyasını al
                currentPost: action.payload //ve actionun payloadını ekle
            };
            case types.DELETE_POST:
                return {
                    ...state,//default state'in kopyasını al
                    posts: state.posts.filter(posts => posts._id !== action.payload),
                    //yukarıda tanımladığımız statetlerden postun içinde filter metodu ile dolaş postlar içinde
                    //sonra postlar içindeki idsi actionlardaki silinen postun idsi ile uyuşmayanlar listele deidk
                    currentPost: null, //silindiği için o anlık post null olacak tekrardan
                };
          case types.CREATE_POST:
          return {
              ...state, //default state'in kopyasını al
              posts: [...state, action.payload ] ,//statteki veri aynı kalsın ve arayyin en sonuna postu ekle
          };
            case types.UPDATE_POST:
          return {
            ...state, //default state'in kopyasını al (yani statei aynen döndür)
            posts: state.posts.map((post) => {//tüm postalrın içinde dolaş
                if(post._id === action.payload._id) {//postun idsi actiondan dönen postun idsi ile aynıysa yani güncelenen post buysa 
                    return action.payload //actiondaki payloadu döndür (güncellenmiş payload)
                }
                else {
                    return post; //değilse içinde dolaştığımız postu geri döndür
                }
            }),
            currentPost: action.payload //currentPOSTU güncellenen post ile değiştirdik.
          };
    
        default:
            return {
                ...state
            };
    };
};
export default postReducer;