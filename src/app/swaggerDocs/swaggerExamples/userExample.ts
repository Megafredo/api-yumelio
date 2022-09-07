//& ----------------------------------------- REQUIRED
const required = {

    //~ ---------------- User
    signUp: ['username', 'email', 'password', 'passwordConfirm'],
    signIn: ['email', 'password']

};


//& ----------------------------------------- EXAMPLE
const example = {
    //~ ---------------- SignUp
    signUp: {
      first_name: 'Yumedo',
      last_name: 'Yumedo',
      email: 'yumedo@survivor.com',
      password: 'N6y$Ozddzt=1aa',
      passwordConfirm: 'N6y$Ozddzt=1aa'
    },
  
    //~ ---------------- SignIn
    signIn: {
      email: 'yumedo@survivor.com',
      password: 'N6y$Ozddzt=1aa'
    },
  
    signInOk: {
      id: 'integer',
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      accessToken: 'string',
      refreshToken: 'string'
    },
  
    //~ ---------------- RefreshToken
    refreshTokenOk: {
      accessToken: 'string',
      refreshToken: 'string'
    },
  
    //~ ---------------- UpdateUser
    updateUser: {
      first_name: 'Yumedo',
      last_name: 'Yumedo',
      email: 'yumedo@survivor.com',
      password: 'N6y$Ozddzt=1aa',
      passwordConfirm: 'N6y$Ozddzt=1aa',
      linkedin_url: 'https://linkedin-url.com/',
      github_url: 'https://github-url.com/',
      instagram_url: 'https://instagram-url.com/'
    }

}


//& ----------------------------------------- PROPERTIES
const properties = {
    //~ ---------------- SignUp
    signUp: {
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      passwordConfirm: { type: 'string' }
    },
  
    //~ ---------------- SignIn
    signIn: {
      email: { type: 'string' },
      password: { type: 'string' }
    },
  
    //~ ---------------- SignIn Ok
    signInOk: {
      id: { type: 'integer' },
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      email: { type: 'string' },
      accessToken: { type: 'string' },
      refreshToken: { type: 'string' }
    },
  
    //~ ---------------- RefreshToken
    refreshTokenOk: {
      accessToken: { type: 'string' },
      refreshToken: { type: 'string' }
    },
  
    //~ ---------------- UpdateUser
    updateUser: {
      first_name: { type: 'string' },
      last_name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      passwordConfirm: { type: 'string' },
      linkedin_url: { type: 'string' },
      github_url: { type: 'string' },
      instagram_url: { type: 'string' }
    }

}



//& ---------------- Tables SQL
const tableSql = {
    //~ ---------------- Table User
    user: {
      id: { type: 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY' },
      first_name: { type: 'TEXT NULL' },
      last_name: { type: 'TEXT NULL' },
      email: { type: 'EMAIL NOT NULL UNIQUE' },
      password: { type: 'PWD NOT NULL' },
      linkedin_url: { type: 'LINK_URL NULL' },
      github_url: { type: 'LINK_URL NULL' },
      instagram_url: { type: 'LINK_URL NULL' },
      role_id: { type: 'INTEGER NOT NULL DEFAULT 3' }
    }
}


//& ---------------- Info return
const infoReturn = {

  //~ ---------------- One User
  oneUser: {
    id: { type: 'integer' },
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    linkedin_url: { type: 'string' },
    github_url: { type: 'string' },
    instagram_url: { type: 'string' }
  },

   //~ ---------------- Sign In User
   signInUser: {
    id: { type: 'integer' },
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    email: { type: 'string' },
    accessToken: { type: 'string' },
    refreshToken: { type: 'string' }
  },
}

export {
    required,
    example,
    properties,
    tableSql,
    infoReturn
  };
  