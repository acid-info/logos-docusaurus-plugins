import { JobsPerBoard } from './useFetchJobs'

// Only for dev purposes - prevents making multiple requests to the API while developing.
export const jobListsDummyData: JobsPerBoard = {
  nomos: {
    jobs: [
      {
        absolute_url: 'https://boards.greenhouse.io/nomos/jobs/5453089',
        data_compliance: [
          {
            type: 'gdpr',
            requires_consent: false,
            requires_processing_consent: false,
            requires_retention_consent: false,
            retention_period: null,
          },
        ],
        internal_job_id: 2315608,
        location: {
          name: 'Remote (Worldwide)',
        },
        metadata: null,
        id: 5453089,
        updated_at: '2023-10-20T07:06:31-04:00',
        requisition_id: 'PROV-Nom-5',
        title: 'Applied Network Researcher',
      },
    ],
    meta: {
      total: 1,
    },
  },
  waku: {
    jobs: [
      {
        absolute_url: 'https://boards.greenhouse.io/waku/jobs/5453096',
        data_compliance: [
          {
            type: 'gdpr',
            requires_consent: false,
            requires_processing_consent: false,
            requires_retention_consent: false,
            retention_period: null,
          },
        ],
        internal_job_id: 2055187,
        location: {
          name: 'Remote (Worldwide)',
        },
        metadata: null,
        id: 5453096,
        updated_at: '2023-10-20T07:00:46-04:00',
        requisition_id: 'PROV-Sec-2',
        title: 'Protocol Engineer',
      },
      {
        absolute_url: 'https://boards.greenhouse.io/waku/jobs/5453098',
        data_compliance: [
          {
            type: 'gdpr',
            requires_consent: false,
            requires_processing_consent: false,
            requires_retention_consent: false,
            retention_period: null,
          },
        ],
        internal_job_id: 1830496,
        location: {
          name: 'Remote, Worldwide',
        },
        metadata: null,
        id: 5453098,
        updated_at: '2023-10-20T07:01:13-04:00',
        requisition_id: 'PROV-Sec-3',
        title: 'Protocol Researcher (Distributed Systems)',
      },
      {
        absolute_url: 'https://boards.greenhouse.io/waku/jobs/5453099',
        data_compliance: [
          {
            type: 'gdpr',
            requires_consent: false,
            requires_processing_consent: false,
            requires_retention_consent: false,
            retention_period: null,
          },
        ],
        internal_job_id: 2584916,
        location: {
          name: 'Remote (Worldwide)',
        },
        metadata: null,
        id: 5453099,
        updated_at: '2023-10-20T07:01:37-04:00',
        requisition_id: 'SDK-2',
        title: 'Software Engineer (Chat SDK)',
      },
      {
        absolute_url: 'https://boards.greenhouse.io/waku/jobs/5453102',
        data_compliance: [
          {
            type: 'gdpr',
            requires_consent: false,
            requires_processing_consent: false,
            requires_retention_consent: false,
            retention_period: null,
          },
        ],
        internal_job_id: 2656108,
        location: {
          name: 'Remote (Worldwide)',
        },
        metadata: null,
        id: 5453102,
        updated_at: '2023-10-20T07:02:20-04:00',
        requisition_id: 'PROV-Wak-13',
        title: 'Software Engineer Distributed Systems Testing',
      },
      {
        absolute_url: 'https://boards.greenhouse.io/waku/jobs/5453103',
        data_compliance: [
          {
            type: 'gdpr',
            requires_consent: false,
            requires_processing_consent: false,
            requires_retention_consent: false,
            retention_period: null,
          },
        ],
        internal_job_id: 2694724,
        location: {
          name: 'Remote (Worldwide)',
        },
        metadata: null,
        id: 5453103,
        updated_at: '2023-10-20T13:12:19-04:00',
        requisition_id: 'WAK-BD-1',
        title: 'Technical Business Development Lead ',
      },
    ],
    meta: {
      total: 5,
    },
  },
}
