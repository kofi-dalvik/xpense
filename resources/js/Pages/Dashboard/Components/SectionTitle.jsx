export default function SectionTitle({ title, subtitle, icon, children }) {
    return (
        <div className='grid sm:grid-cols-12 my-4'>
            <div className='col-span-8'>
                <div className='flex items-center'>
                    <div className='icon res-text-5xl me-2 text-primary'>
                        <i className={`mdi ${icon}`}></i>
                    </div>

                    <div className='text'>
                        <h1 className='m-0 res-text-xl'>{ title }</h1>
                        <p className='m-0 res-text-sm text-muted'>
                            { subtitle }
                        </p>
                    </div>
                </div>
            </div>

            <div className='mt-4 sm:mt-0 col-span-4'>
                { children }
            </div>
        </div>
    );
}