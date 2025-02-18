import {API_URL} from '@env';
import axios from 'axios';

export const getServerUrl = () => {
  return API_URL;
};

export const communication = {
  login: async formData => {
    try {
      const result = await axios.post(
        `${getServerUrl()}/Registration.php`,
        formData,
        {
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return result?.data;
    } catch (error) {
      console.log(error?.message);
    }
  },
  verifyOtp: async formData => {
    try {
      const result = await axios.post(
        `${getServerUrl()}/Check_otp.php`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return result?.data;
    } catch (error) {
      console.log(error?.message);
    }
  },
  getMasterData: async data => {
    try {
      let formData = new FormData();
      const {MASTERID, TOKEN_KEY, CMBDISTRICT, CMBWING, CMBOFFICE} = data;
      if (TOKEN_KEY) {
        formData.append('TOKENKEY', TOKEN_KEY);
      }
      if (MASTERID) {
        formData.append('MASTERID', MASTERID);
      }
      if (CMBDISTRICT) {
        formData.append('CMBDISTRICT', CMBDISTRICT);
      }
      if (CMBWING) {
        formData.append('CMBWING', CMBWING);
      }
      if (CMBOFFICE) {
        formData.append('CMBOFFICE', CMBOFFICE);
      }
      const result = await axios.post(
        `${getServerUrl()}/GetMaster.php`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return result?.data;
    } catch (error) {
      console.log(error?.message);
    }
  },
  submitCattleKillForm: async formData => {
    try {
      const result = await axios.post(
        `${getServerUrl()}/PostCattle.php`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return result?.data;
    } catch (error) {
      console.log(error?.message);
    }
  },
  submitHumanDeathForm: async formData => {
    try {
      const result = await axios.post(
        `${getServerUrl()}/PostHuman.php`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return result?.data;
    } catch (error) {
      console.log(error?.message);
    }
  },
  submitCropDamageForm: async formData => {
    try {
      const result = await axios.post(
        `${getServerUrl()}/PostCrop.php`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return result?.data;
    } catch (error) {
      console.log(error?.message);
    }
  },
  getApplicationList: async data => {
    try {
      let formData = new FormData();
      const {TOKENKEY, REGISTER_ID} = data;
      if (TOKENKEY) {
        formData.append('TOKENKEY', TOKENKEY);
      }
      if (REGISTER_ID) {
        formData.append('REGISTER_ID', REGISTER_ID);
      }
      const result = await axios.post(
        `${getServerUrl()}/GetTrack.php`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('app result', result?.data);

      return result?.data;
    } catch (error) {
      console.log(error?.message);
    }
  },
};
