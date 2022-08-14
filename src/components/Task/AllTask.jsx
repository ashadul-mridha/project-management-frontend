import React from 'react';
import ViewHeader from '../ViewHeader';
import TaskCard from './TaskCard';

const AllTask = () => {
    const headerData ={
        title: "All Task",
        date: "14 Aug 2023"
    }
    const tasks = [
      {
        name: "Math Exam",
        desc: "Math 3rd Chapter",
        time: "4 Sep 2023",
      },
      {
        name: "English Exam",
        desc: "Math Business Letter",
        time: "30 Sep 2023",
      },
      {
        name: "Digital Signal Exam",
        desc: "Signal K-map Chapter",
        time: "1 Sep 2023",
      },
      {
        name: "Chemisty Exam",
        desc: "Asolation Chapter",
        time: "12 Sep 2023",
      },
    ];
    return (
      <>
        <ViewHeader data={headerData} />
        {tasks.map((task) => (
          <TaskCard key={task.name} data={task} />
        ))}
      </>
    );
};

export default AllTask;