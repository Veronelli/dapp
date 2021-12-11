// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TaskContract {
    struct Task {
        uint256 id;
        string title;
        string description;
        bool status;
        uint256 createdAt;
    }
    uint256 public counter = 0;
    mapping(uint256 => Task) public tasks;

    constructor() {
        createTask("Welcome", "First Task");
    }

    event taskCreated(
        uint256 id,
        string title,
        string description,
        bool status,
        uint256 createdAt
    );

    event taskToggleStatus(
        uint256 id,
        string title,
        string description,
        bool status,
        uint256 createdAt
    );

    function createTask(string memory _title, string memory _description)
        public
    {
        counter++;
        Task memory task = Task(
            counter,
            _title,
            _description,
            false,
            block.timestamp
        );
        tasks[counter] = task;
        emit taskCreated(
            task.id,
            _title,
            _description,
            task.status,
            task.createdAt
        );
    }

    function toggleStatus(uint256 _id) public {
        Task memory task = tasks[_id];
        task.status = !task.status;
        tasks[_id] = task;
        emit taskToggleStatus(
            task.id,
            task.title,
            task.description,
            task.status,
            task.createdAt
        );
    }
}
