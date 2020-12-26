import React, { useState } from 'react';
import { Upload, message, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const dummyRequest = ({ file, onSuccess }: any) => {
  setTimeout(() => {
    onSuccess('ok');
  }, 0);
};

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

interface AvatarUploadProps {}

const AvatarUpload: React.FC<AvatarUploadProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleChange = (info: any) => {
    switch (info.file.status) {
      case 'uploading':
        setIsLoading(true);
        break;
      case 'done':
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl: string) => {
          setIsLoading(false);
          setImageUrl(imageUrl);
        });
        break;
      default:
        setIsLoading(false);
        setImageUrl(null);
    }
  };

  const handleCancle = () => {
    setImageUrl(null);
  };

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div style={{ display: 'flex', width: 'fit-content' }}>
      <Upload
        name='avatar'
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        customRequest={dummyRequest}
        beforeUpload={beforeUpload}
        onChange={handleChange}>
        {imageUrl ? (
          <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <Button onClick={handleCancle}>Cancle</Button>
    </div>
  );
};

export default AvatarUpload;
