export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface OverlayProps {
  onClose: () => void;
}

export interface ModalProps extends OverlayProps {
  isProfileModal: boolean;
  onUploadPhoto: (formData: FormData, isProfileModal: boolean) => void;
  isUploading: boolean;
}

interface Followers {
  createdAt: string;
  followeeId: number;
  followingId: number;
  id: number;
  updatedAt: string;
}

export interface UserData {
  createdAt: string;
  email: string;
  id: number;
  name: string;
  numFollowers: number;
  numLikes: number;
  profileImage: string;
  resetToken: string | null;
  resetTokenExpiration: string | null;
  updatedAt: string;
  followers?: Followers[];
}

export interface ImageData {
  caption?: string;
  createdAt: string;
  id: number;
  imageLikes?: [{ imageId: number; userId: number }];
  imageUrl: string;
  tags?: [{ tag: string }];
  updatedAt: string;
  userId: number;
}

export interface CommentData {
  comment: string;
  commentLikes: [{ commentId: number; userId: number }];
  createdAt: string;
  id: number;
  imageId: number;
  updatedAt: string;
  userId: number;
}
