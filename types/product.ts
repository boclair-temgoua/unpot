import { ModelType, PaginationResponse } from '@/utils/paginations';
import { ProfileItemModel } from './profile.type';
import { UploadModel } from './upload';

export const arrayWhoCanSees = [
  { id: '1', name: 'PUBLIC' },
  { id: '2', name: 'MEMBERSHIP' },
];

export const arrayProductTypes = [
  { id: '1', name: 'DIGITAL' },
  // { id: '2', name: 'PHYSICAL' },
];

export type ProductType = 'DIGITAL' | 'PHYSICAL';

export type ProductTab = 'AUDIO' | 'MEDIA' | 'OTHER';

export type ResponseProductModel = {
  value: Array<ProductModel>;
} & PaginationResponse;

export type ProductModel = {
  createdAt: Date;
  id: string;
  title: string;
  subTitle: string;
  slug: string;
  sku: string;
  tab: string;
  whoCanSee: string;
  organizationId: string;
  urlMedia: string;
  productType: ProductType;
  priceNoDiscount: string;
  description: string;
  messageAfterPayment: string;
  moreDescription: string;
  urlRedirect: string;
  enableUrlRedirect: boolean;
  enableChooseQuantity: boolean;
  enableLimitSlot: boolean;
  enableDiscount: boolean;
  limitSlot: string;
  status: string;
  userId: string;
  model: ModelType;
  categoryId: string;
  totalComment: number;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
  profile: ProfileItemModel;
  uploadsImages: Array<UploadModel>;
  uploadsFiles: Array<UploadModel>;
  isUnlock: number;
  discount: {
    isValid: boolean;
    percent: number;
    expiredAt: Date;
    enableExpiredAt: boolean;
  };
  price: string;
  priceDiscount: string;
};

export type ProductFormModel = {
  title: string;
  enableChooseQuantity: boolean;
  urlMedia: string;
  price: number;
  tab: ProductTab;
  messageAfterPayment: string;
  description: string;
  discountId: string;
  whoCanSee: string;
  categoryId: string;
  productType: ProductType;
  enableDiscount: boolean;
  limitSlot: number;
  enableVisibility: boolean;
  enableLimitSlot: boolean;
  urlRedirect: string;
  model: ModelType;
  enableUrlRedirect: boolean;
  attachments: any;
  attachment: any;
  fileList: any;
  newFileLists: any;
  imageList: any;
  newImageLists: any;
};
