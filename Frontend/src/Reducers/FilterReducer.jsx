import {
  CLEAR_FILTER,
  FILTER_PRODUCTS,
  GET_SORT_VALUE,
  LOAD_PRODUCTS,
  SORTING_PRODUCTS,
  UPDATE_FILTER_PRODUCTS,
} from "../Constants/FilterConstant";

const filterInitialState = {
  filter_Products: [],
  all_Products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
  },
};

const FilterReducers = (state = filterInitialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      if (!action.payload || !Array.isArray(action.payload)) {
        return state;
      }

      let Price = action.payload.map((curElem) => curElem.price);
      let maxPrice = Math.max(...Price);

      return {
        ...state,
        filter_Products: [...action.payload],
        all_Products: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };

    case GET_SORT_VALUE:
      return {
        ...state,
        sorting_value: action.payload,
      };

    case SORTING_PRODUCTS:
      let newSProduct;
      const { filter_Products, sorting_value } = state;

      let tempSortValue = [...filter_Products];

      const sortProducts = (a, b) => {
        if (sorting_value === "lowest") {
          return a.price - b.price;
        }

        if (sorting_value === "highest") {
          return b.price - a.price;
        }

        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        }

        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };

      newSProduct = tempSortValue.sort(sortProducts);

      return {
        ...state,
        filter_Products: newSProduct,
      };

    case UPDATE_FILTER_PRODUCTS:
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case FILTER_PRODUCTS:
      let { all_Products } = state;
      let tempFilterProduct = [...all_Products];

      const { text, category, company, price } = state.filters;

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.name.toLowerCase().includes(text);
        });
      }

      if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.category === category
        );
      }

      if (company !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.company.toLowerCase() === company.toLowerCase()
        );
      }

      if (price === 0) {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price == price
        );
      } else {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price <= price
        );
      }

      return {
        ...state,
        filter_Products: tempFilterProduct,
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          category: "all",
          company: "all",
          maxPrice: 0,
          price: state.filters.maxPrice,
          minPrice: state.filters.maxPrice,
        },
      };

    default:
      return state;
  }
};

export { FilterReducers };
