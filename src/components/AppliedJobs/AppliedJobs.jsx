import { useLoaderData } from "react-router-dom";
import { getStoredJobApplication } from "../../utility/localStorage";
import { useEffect, useState } from "react";

const AppliedJobs = () => {
    const jobs = useLoaderData();

    const [jobsApplied, setJobsApplied] = useState([]);
    // console.log(jobsApplied);
    const [displayJobs, setDisplayJobs] = useState([]);

    const handleJobsFilter = (filter) => {
        if(filter === 'all'){
            setDisplayJobs(jobsApplied);
        }
        else if (filter === 'remote'){
            const remoteJobs = jobsApplied.filter(job =>job.remote_or_onsite === 'Remote');
            setDisplayJobs(remoteJobs);
        }
        else if (filter === 'onsite'){
            const OnsiteJobs = jobsApplied.filter(job =>job.remote_or_onsite === 'Onsite');
            setDisplayJobs(OnsiteJobs);
        }
    }

    useEffect(() => {
        const storedJobIds = getStoredJobApplication();

        if (jobs.length > 0) {
            const matchedJobs = jobs.filter(job => storedJobIds.includes(job.id));
            console.log(jobs, storedJobIds, matchedJobs);
            setJobsApplied(matchedJobs);
            setDisplayJobs(matchedJobs);
        }
    }, [jobs])
    return (
        <div>
            <h2 className="text-5xl text-center py-10">Jobs applied: {jobsApplied.length}</h2>
            <details className="dropdown mb-32">
                <summary className="m-1 btn">open or close</summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
                    <li onClick={() => handleJobsFilter('all')}><a>All</a></li>
                    <li onClick={() => handleJobsFilter('remote')}><a>Remote</a></li>
                    <li onClick={() => handleJobsFilter('onsite')}><a>Onsite</a></li>
                </ul>
            </details>
            <ul className="text-3xl">
                {
                    displayJobs.map(job =><li key={job.id}>
                        <span>{job.job_title} {job.company_name}: <span className="font-semibold">{job.remote_or_onsite}</span> </span>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default AppliedJobs;