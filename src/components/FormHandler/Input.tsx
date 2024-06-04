"use client";

type TInputProps = {
    name: string;
    type: string;
    label: string;
    width: string;
    required: boolean;
}

const Input = ({name, type, label, width, required = true }: TInputProps) => {
    return (
        <div>
            <div className="form-control mb-4 text-black">
                     <label className='label'>
                     <span className="label-text">{label}</span>
                     </label>
                     <input name={name} type={type} placeholder={label}  required={required} className={`input input-bordered w-full input-${width}`} />
             </div>
        </div>
    );
};

export default Input;