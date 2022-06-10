import { _delete, _get, _post } from './HttpService';

const _addInsight = (notificationData) => _post('/insights/addInsight', notificationData);
const _getAllInsights = () => _get('/insights/getAllInsights');
const _deleteInsight = (id) => _delete(`/insights/deleteInsight/${id}`);
const InsightsService = {
  _addInsight,
  _getAllInsights,
  _deleteInsight,
};

export default InsightsService;
