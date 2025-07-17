export interface QueryProps {
    select: "get" | "update" | "insert" | "delete";
    model: "MongoDB";
    collection?: string;
    query: "";
}

export interface FiltersProps {
    form: QueryProps;
    handleChange: (field:string, value: string)=>void;
}
export interface BtnFilter {
    form: QueryProps;
    GetData: (form: QueryProps, setForm: React.Dispatch<React.SetStateAction<QueryProps>>)=>void;
    setForm: React.Dispatch<React.SetStateAction<QueryProps>>;
}

export interface FilterComponentProps {
   GetMethod: (form:QueryProps)=>boolean; 
   GetModel: (form:QueryProps)=>boolean; 
   GetCollections: (form:QueryProps)=>boolean; 
}

//*TABLE
export interface TableProps {
  thead: {type: string, data: string[]};
  data?: Record<string, any> | null;
  getData: (body: Record<string, any>) => Promise<void>;
}
