import { _get, _post, _put, _delete } from './HttpService';

const _createHeroSection = (data) => _post('/heroSection/createHeroSection', data);
const _getHeroSection = () => _get('/heroSection/getHeroSection');
const _deleteHeroSection = (id) => _delete(`/heroSection/deleteHeroSection/${id}`);
const HeroSection = {
  _createHeroSection,
  _getHeroSection,
  _deleteHeroSection,
};

export default HeroSection;
