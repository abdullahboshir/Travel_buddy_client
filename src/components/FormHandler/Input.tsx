"use client";

type TInputProps = {
    name: string;
    type: string;
    label: string;
    width: string;
}

const Input = ({name, type, label, width }: TInputProps) => {
    return (
        <div>
            <div className="form-control mb-4 text-black">
                     <label className='label'>
                     <span className="label-text">{label}</span>
                     </label>
                     <input name={name} type={type} placeholder={label} className={`input input-bordered w-full input-${width}`} required />
             </div>
        </div>
    );
};

export default Input;