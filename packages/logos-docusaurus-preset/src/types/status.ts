export namespace Status {
  export namespace Contacts {
    export type Contact = {
      'pref-name': string
      department: Department | null
      'photo-path': string | null
      contact: {
        email: string | null
        status: string | null
        github: string | null
        discord: string | null
        gscholar: string | null
      }
    }

    export type Data = Record<string, Contact>
  }

  export enum Department {
    Blockchain = 'Blockchain',
    Codex = 'Codex',
    CommsHub = 'Comms Hub',
    CommsMarketing = 'Comms/Marketing',
    DAO = 'DAO',
    Desktop = 'Desktop',
    Documentation = 'Documentation',
    EcoSystemDevelopment = 'Eco-System-Development',
    Finance = 'Finance',
    InfrastructureOps = 'Infrastructure Ops',
    Keycard = 'Keycard',
    Legal = 'Legal',
    Libp2p = 'Libp2p',
    Mobile = 'Mobile',
    Nim = 'Nim',
    PPG = 'PPG',
    PeopleOps = 'People Ops',
    ProductDesign = 'Product Design',
    ProgramLead = 'Program Lead',
    Security = 'Security',
    WakuProduct = 'Waku Product',
    WakuResearch = 'Waku Research',
    Web = 'Web',
  }
}
