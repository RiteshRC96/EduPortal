import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api/colleges';
// ─── API Calls ───────────────────────────────────────────────────────────────
/** Fetch all states for the State dropdown */
export const fetchStates = () => axios.get(`${BASE_URL}/states`).then((r) => r.data);
/** Fetch districts for a given stateId */
export const fetchDistricts = (stateId) => axios.get(`${BASE_URL}/districts`, { params: { stateId } })
    .then((r) => r.data);
/** Paginated, A–Z sorted institute listing with optional filters */
export const fetchInstitutes = (params) => axios
    .get(BASE_URL, {
    params: {
        ...(params.stateId !== undefined && { stateId: params.stateId }),
        ...(params.districtId !== undefined && { districtId: params.districtId }),
        page: params.page ?? 0,
        size: params.size ?? 10,
    },
})
    .then((r) => r.data);
/** Full detail for a single institute (used by the detail modal) */
export const fetchInstituteDetail = (id) => axios.get(`${BASE_URL}/${id}`).then((r) => r.data);
