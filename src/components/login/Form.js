import React from 'react'
import { useForm } from 'react-hook-form';
import $ from 'jquery';

export default function Form(props) {
    const { register, errors, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className="form-group">
                <label className="col-form-label">UserName:</label>
                <input type="text" name="userName"
                       className="form-control"
                       ref={register({ required: true, minLength: 3 })}/>
                {errors.userName &&
                <p class="text-danger">
                    UserName must be longer than 3
                </p>}
            </div>
            <div className="form-group">
                <label className="col-form-label">Password:</label>
                <input type="password" name="passWord"
                       className="form-control"
                       ref={register({ required: true, minLength: 6 })}/>
                {errors.passWord &&
                <p className="text-danger">
                    Password must be longer than 6
                </p>}
            </div>
            {props.type === 'register' &&
            <div className="form-group">
                <label className="col-form-label">Confirm Password:</label>
                <input type="password" name="confirm"
                       className="form-control"
                       ref={register({
                           validate: value => {
                               let preValue = $( "input[name='passWord']" ).val();
                               return value === preValue ? true : false;
                           }
                       })}/>
                {errors.confirm &&
                <p className="text-danger">
                    Password not match
                </p>}
            </div>
            }
            <input type="submit" className="btn btn-secondary" value={props.type}/>
        </form>
    );
}