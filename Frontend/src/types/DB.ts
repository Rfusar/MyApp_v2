type HashedString = string & { readonly __brand: 'HashedString' };
export interface User {
    NameID: string;
    Password: HashedString;
    CompanyName: string;
    Group: string;
}
export interface Service {
    Apikey: HashedString;
    ServiceID: string;
}
export interface API {
    Apikey: HashedString;
    APIID: string;
}



//API DB
export interface QueryView {
  method: "get";
  many: boolean;
  setFilters?: Record<string, any>;
  returnFilters?: Record<string, any>;
}

export interface QueryUpdate {
  method: "update";
  many: boolean;
  setFilters: Record<string, any>;
  data: Record<string, any>;
}

export interface QueryInsert {
  method: "insert";
  many: boolean;
  data: Record<string, any>;
}

export interface QueryDelete {
  method: "delete";
  many: boolean;
  setFilters?: Record<string, any>;
}

export interface BodyRequestDB {
  collection: string;
  query: QueryView | QueryDelete | QueryUpdate | QueryInsert;
}

