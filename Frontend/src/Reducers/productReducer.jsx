import {
  Product_Request,
  Product_Success,
  Product_Fail,
  Clear_Errors,
  Single_Product_Request,
  Get_Single_Product,
  Single_Product_Fail,
  SIMILAR_PRODUCT_REQUEST,
  GET_SIMILAR_PRODUCT_SUCCESS,
  SIMILAR_PRODUCT_FAIL,
} from "../Constants/ProductsConstant";

const initialstate = {
  loading: false,
  products: [],
  featureProduct: [],
  allCloths: [],
  allShoes: [],
  allAssasories: [],
  allLaptops: [],
  allGames: [],
  allSports: [],
  allCameras: [],
  allHeadPhones: [],
  allDecore: [],
  allBHealth: [],
  allLuggague: [],
  allBags: [],
  allBooks: [],
  allMobiles:[],
  allTablet:[],
  allWatch:[],
};

const similarProductInitalState = {
  LoadingSimilar: false,
  AllSimilarProduct: [],
  error: null,
};

const ProductReducer = (state = initialstate, action) => {
  switch (action.type) {
    case Product_Request:
      return {
        loading: true,
        products: [],
      };

    case Product_Success:
      const clothData = action.payload.products.filter((curEl) => {
        return curEl.category === "Cloths";
      });

      const latestData = action.payload.products.filter((curElem) => {
        return curElem.latest === true;
      });

      const shoesData = action.payload.products.filter((curElem) => {
        return curElem.category === "Shoes";
      });

      const assasoriesData = action.payload.products.filter((curElem) => {
        return curElem.category === "Assasories";
      });

      const laptopData = action.payload.products.filter((curElem) => {
        return curElem.category === "Laptop";
      });

      const camersData = action.payload.products.filter((curElem) => {
        return curElem.category === "Cameras";
      });

      const HeadphoneData = action.payload.products.filter((curElem) => {
        return curElem.category === "Headphone";
      });

      const HomeData = action.payload.products.filter((curElem) => {
        return curElem.category === "Home";
      });

      const BagsData = action.payload.products.filter((curElem) => {
        return curElem.category === "Bags";
      });

      const BooksData = action.payload.products.filter((curElem) => {
        return curElem.category === "Books";
      });

      const LuggagueData = action.payload.products.filter((curElem) => {
        return curElem.category === "Luggage";
      });

      const SportData = action.payload.products.filter((curElem) => {
        return curElem.category === "Sports";
      });

      const InstrumentsData = action.payload.products.filter((curElem) => {
        return curElem.category === "Instruments";
      });

      const BHealthData = action.payload.products.filter((curElem) => {
        return curElem.category === "Beauty/Health";
      });

      const MobileData = action.payload.products.filter((curElem) => {
        return curElem.category === "Mobiles";
      });

      const TabletData = action.payload.products.filter((curElem) => {
        return curElem.category === "Tablets";
      });

      const WatchData = action.payload.products.filter((curElem) => {
        return curElem.category === "SmartWatches";
      });

      return {
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
        featureProduct: latestData,
        allCloths: clothData,
        allShoes: shoesData,
        allAssasories: assasoriesData,
        allLaptops: laptopData,
        allCameras: camersData,
        allHeadPhones: HeadphoneData,
        allDecore: HomeData,
        allBHealth: BHealthData,
        allLuggague: LuggagueData,
        allBags: BagsData,
        allBooks: BooksData,
        allSports: SportData,
        allGames: InstrumentsData,
        allMobiles:MobileData,
        allTablet:TabletData,
        allWatch:WatchData
      };

    case Product_Fail:
      return {
        loading: false,
        error: action.payload,
      };

    case Clear_Errors:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const SingleProductReducer = (state = { SingleProduct: {} }, action) => {
  switch (action.type) {
    case Single_Product_Request:
      return {
        ...state,
        loading: true,
      };

    case Get_Single_Product:
      return {
        ...state,
        loading: false,
        SingleProduct: action.payload,
      };

    case Single_Product_Fail:
      return {
        ...state,
        error: null,
      };

    case Clear_Errors:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const SimilarProductReducer = (state = similarProductInitalState, action) => {
  switch (action.type) {
    case SIMILAR_PRODUCT_REQUEST:
      return {
        LoadingSimilar: true,
        AllSimilarProduct: [],
      };

    case GET_SIMILAR_PRODUCT_SUCCESS:
      return {
        ...state,
        LoadingSimilar: false,
        AllSimilarProduct: action.payload.searchSimilarProduct,
        error: null,
      };

    case SIMILAR_PRODUCT_FAIL:
      return {
        ...state,
        LoadingSimilar: false,
        AllSimilarProduct: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export { ProductReducer, SingleProductReducer, SimilarProductReducer };
