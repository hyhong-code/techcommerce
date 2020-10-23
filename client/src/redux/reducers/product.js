import {
  PRODUCT_CREATED,
  PRODUCT_FETCHED,
  PRODUCT_UPDATED,
  PRODUCT_DELETED,
  PRODUCT_LISTED,
  IMAGE_PREVIEWED,
  IMAGE_PREVIEW_CANCELED,
  IMAGE_LIST_CHANGED,
} from "../actions";

const INITIAL_STATE = {
  products: null,
  uploader: {
    fileList: [],
    preview: {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
    },
  },
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATED:
      return {
        ...state,
        products: [payload, ...state.products],
      };
    case PRODUCT_LISTED:
      return {
        ...state,
        products: payload,
      };

    default:
      return state;
  }
};
