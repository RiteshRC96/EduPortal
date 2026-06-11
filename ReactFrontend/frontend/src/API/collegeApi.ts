import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/colleges';

// ─── Types matching backend DTOs ─────────────────────────────────────────────

export interface State {
  id: number;
  stateName: string;
}

export interface District {
  id: number;
  stateId: number;
  districtName: string;
}

export interface InstituteCard {
  id: number;
  instituteName: string;
  address: string;
  stateName: string;
  districtName: string;
  institutionType: string;
  university: string;
  aicteId: string;
}

export interface ProgrammeDTO {
  id: number;
  programme: string;
  course: string;
  courseType: string;
  level: string;
  shift: string;
  intake: string | null;
  availability: string | null;
  enrollment: string | null;
  placement: string | null;
}

export interface InstituteDetail {
  id: number;
  instituteName: string;
  address: string;
  stateName: string;
  districtName: string;
  institutionType: string;
  university: string;
  aicteId: string;
  women: string;
  minority: string;
  totalIntake: number;
  totalEnrollment: number;
  totalPlacement: number;
  placementPercentage: number;
  programmes: ProgrammeDTO[];
}

// Spring Page<T> wrapper shape
export interface SpringPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;       // current page (0-indexed)
  size: number;
}

// ─── API Calls ───────────────────────────────────────────────────────────────

/** Fetch all states for the State dropdown */
export const fetchStates = (): Promise<State[]> =>
  axios.get<State[]>(`${BASE_URL}/states`).then((r) => r.data);

/** Fetch districts for a given stateId */
export const fetchDistricts = (stateId: number): Promise<District[]> =>
  axios.get<District[]>(`${BASE_URL}/districts`, { params: { stateId } })
    .then((r) => r.data);

/** Paginated, A–Z sorted institute listing with optional filters */
export const fetchInstitutes = (
  params: {
    stateId?: number;
    districtId?: number;
    page?: number;
    size?: number;
  }
): Promise<SpringPage<InstituteCard>> =>
  axios
    .get<SpringPage<InstituteCard>>(BASE_URL, {
      params: {
        ...(params.stateId    !== undefined && { stateId: params.stateId }),
        ...(params.districtId !== undefined && { districtId: params.districtId }),
        page: params.page ?? 0,
        size: params.size ?? 10,
      },
    })
    .then((r) => r.data);

/** Full detail for a single institute (used by the detail modal) */
export const fetchInstituteDetail = (id: number): Promise<InstituteDetail> =>
  axios.get<InstituteDetail>(`${BASE_URL}/${id}`).then((r) => r.data);
