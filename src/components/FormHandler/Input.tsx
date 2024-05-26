"use client";

type TInputProps = {
    name: string;
    type: string;
    label: string;
}

const Input = ({name, type, label }: TInputProps) => {
    return (
        <div>
            <div className="form-control mb-4 text-black">
                     <label className='label'>
                     <span className="label-text">{label}</span>
                     </label>
                     <input name={name} type={type} placeholder={label} className="input input-bordered" required />
             </div>
        </div>
    );
};

export default Input;