export interface ForgetPasswordFormFieldsType {
    email : string
}

export interface LoginFormFieldsType {
    email: string,
    password: string
}

export interface FormsType {
    control?: any;
    errors: any;
    handleSubmit: any;
    register: any;
    onSubmit: any
    isLoading: boolean
}

export interface RegisterFormFieldsType {
    email: string,
    password: string,
    how_did_hear: string
}

export interface NewPostFormFieldsType {
    post_title: string,    
    post: string,

}