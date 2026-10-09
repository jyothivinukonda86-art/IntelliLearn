package com.learningplatform.config;

import com.learningplatform.config.QuizSeed.QuestionSeed;

public class OsQuizData {

    // ================= CHAPTER 1: OS Architecture & Process Management =================
    public static QuizSeed getCh1Easy() {
        return new QuizSeed(
                "OS Ch 1: Operating System Fundamentals (Easy)",
                "Kernel basics, system calls, process states, and dual-mode CPU operation.",
                "EASY",
                5,
                new QuestionSeed[] {
                        new QuestionSeed("What is the primary role of the Operating System kernel?",
                                "Serve as the core bridge managing hardware resources and software interactions", "Design user graphical interfaces", "Compile source code into machine executables", "Manage web browser extensions",
                                "A", "The kernel is the foundational core of the OS responsible for managing CPU, memory, devices, and system calls."),
                        new QuestionSeed("Which CPU execution mode has unrestricted access to hardware instructions and physical memory?",
                                "User mode", "Kernel (Supervisor) mode", "Sandbox mode", "Protected application mode",
                                "B", "Kernel mode (Ring 0) allows execution of privileged instructions and direct hardware access; user mode (Ring 3) is restricted."),
                        new QuestionSeed("What is a Process in operating systems?",
                                "A program stored passively on disk", "A program in active execution with dedicated memory space", "A thread pool configuration file", "A system call table",
                                "B", "A process is an active program instance executing in memory, containing its own address space, stack, heap, and registers."),
                        new QuestionSeed("Which data structure stores all essential information about a specific process?",
                                "PCB (Process Control Block)", "TCB (Task Color Bar)", "FAT (File Allocation Table)", "MBR (Master Boot Record)",
                                "A", "The Process Control Block (PCB) contains process ID, state, program counter, CPU registers, scheduling priority, and memory limits."),
                        new QuestionSeed("Which system call is used in Unix-like systems to create a new process by duplicating the caller?",
                                "fork()", "exec()", "wait()", "exit()",
                                "A", "The fork() system call creates an exact child duplicate process with its own copy-on-write virtual address space.")
                }
        );
    }

    public static QuizSeed getCh1Medium() {
        return new QuizSeed(
                "OS Ch 1: Process Lifecycle & Inter-Process Communication (Medium)",
                "Process states, context switching overhead, pipes, message queues, and shared memory.",
                "MEDIUM",
                10,
                new QuestionSeed[] {
                        new QuestionSeed("What are the five canonical states in a standard process lifecycle?",
                                "New, Ready, Running, Waiting (Blocked), Terminated", "Created, Paused, Resumed, Stopped, Erased", "Idle, Processing, Queued, Finished, Archived", "Boot, Kernel, User, Sleep, Dead",
                                "A", "Standard process states are New (creation), Ready (in queue for CPU), Running (executing on core), Waiting (waiting on I/O), and Terminated."),
                        new QuestionSeed("What is a Context Switch in CPU multitasking?",
                                "Switching the monitor display resolution", "Saving the state of the active process in its PCB and loading the state of the next ready process", "Compiling bytecode into machine instructions", "Changing file permissions on disk",
                                "B", "A context switch saves CPU register contents, program counters, and memory mappings of the running process and restores another process's state."),
                        new QuestionSeed("What is the main advantage of Threads (User/Kernel) over separate Processes?",
                                "Threads share the same address space and memory, resulting in lower creation and context-switch overhead", "Threads cannot crash each other's memory", "Threads run on separate physical computers", "Threads bypass the OS kernel scheduler completely",
                                "A", "Threads within a process share the text, data, and heap segments, making communication and context switching much faster than full process switches."),
                        new QuestionSeed("What is a 'Zombie Process' in Unix operating systems?",
                                "A process that consumes 100% of CPU cycles continuously", "A terminated child process whose termination status has not yet been read by its parent via wait()", "A process that cannot be killed by SIGKILL", "A background daemon running without a terminal",
                                "B", "A zombie process has finished execution but remains in the process table until its parent reads its exit status code using wait()."),
                        new QuestionSeed("Which Inter-Process Communication (IPC) mechanism provides the fastest data exchange between processes on the same machine?",
                                "Named Pipes (FIFOs)", "Shared Memory", "Unix Domain Sockets", "Message Queues",
                                "B", "Shared Memory is the fastest IPC mechanism because processes read and write directly to common RAM addresses without kernel buffer copy overhead."),
                        new QuestionSeed("What is an 'Orphan Process'?",
                                "A process running without network connectivity", "A child process whose parent process terminated before calling wait()", "A process scheduled with negative priority", "A corrupted executable that cannot be executed",
                                "B", "An orphan process is a running child process whose parent terminated; Unix automatically re-parents orphans to init (PID 1) or systemd."),
                        new QuestionSeed("What happens during a system call trap from User Mode to Kernel Mode?",
                                "Hardware switches mode bit from 1 to 0, saves program counter, and branches to the kernel interrupt vector table", "The operating system restarts the machine", "The user process memory is wiped", "A new process is spawned automatically",
                                "A", "A system call executes a software interrupt (or syscall assembly instruction), switching the CPU privilege bit and transferring control safely to the kernel handler.")
                }
        );
    }

    public static QuizSeed getCh1Hard() {
        return new QuizSeed(
                "OS Ch 1: Microkernels, IPC & Advanced Process Architecture (Hard)",
                "Monolithic vs microkernels, futexes, copy-on-write, signals, and namespace isolation.",
                "HARD",
                15,
                new QuestionSeed[] {
                        new QuestionSeed("What is the core architectural difference between a Monolithic Kernel and a Microkernel?",
                                "Monolithic kernels run all OS services (file systems, drivers, networking) in kernel space; microkernels keep only minimal IPC, scheduling, and memory in kernel space", "Monolithic kernels do not support multithreading", "Microkernels are slower because they cannot access physical RAM", "Monolithic kernels use virtual machines exclusively",
                                "A", "Monolithic kernels run all system abstractions in supervisor mode for performance; microkernels run drivers and filesystems as user-space servers for stability and modularity."),
                        new QuestionSeed("How does Copy-on-Write (COW) optimize the fork() system call?",
                                "Pages are shared read-only between parent and child until either process attempts a write, at which point a private page copy is created", "Pages are compressed with gzip before duplicating", "Parent memory is immediately flushed to swap space", "Memory is cloned synchronously during fork()",
                                "A", "COW defers copying memory pages until one process writes to a page, avoiding unnecessary memory duplication when fork() is immediately followed by exec()."),
                        new QuestionSeed("What is a 'Futex' (Fast Userspace Mutex) in modern Linux systems?",
                                "A synchronization primitive that operates in user space without kernel context switches unless contention actually occurs", "A lock that prevents file deletion by non-root users", "A hardware bus lock on PCIe cards", "A deprecated POSIX signal handler",
                                "A", "Futex uses atomic operations in user space for the uncontended path and invokes the sys_futex kernel syscall only when a thread must sleep or wake up."),
                        new QuestionSeed("Which POSIX signal cannot be caught, blocked, or ignored by a user-space process?",
                                "SIGINT", "SIGTERM", "SIGKILL", "SIGUSR1",
                                "C", "SIGKILL (signal 9) and SIGSTOP cannot be handled, caught, or ignored; the kernel directly terminates or pauses the target process."),
                        new QuestionSeed("What Linux kernel mechanism provides process isolation for container runtimes like Docker?",
                                "Namespaces (PID, Mount, Net) and Control Groups (cgroups)", "Chroot alone without kernel modifications", "KVM hardware virtualization extensions", "SELinux policies exclusively",
                                "A", "Linux Namespaces isolate system resources (process IDs, network interfaces, mounts), while cgroups meter and throttle CPU, memory, and I/O usage."),
                        new QuestionSeed("What is the role of the vDSO (Virtual Dynamic Shared Object) in Linux?",
                                "Allows user-space programs to execute certain kernel calls like clock_gettime() without the overhead of a CPU context switch trap", "Emulates 32-bit binaries on 64-bit systems", "Stores dynamically loaded shared libraries on disk", "Encrypts shared memory between processes",
                                "A", "vDSO maps kernel data pages into user space, allowing syscalls like gettimeofday() to read timestamps in user mode with zero syscall trap overhead."),
                        new QuestionSeed("In asynchronous I/O, what is the key architectural difference between epoll and io_uring?",
                                "epoll is readiness-based (notifies when file descriptor is ready); io_uring is completion-based using submission and completion ring buffers in shared memory", "io_uring works only with UDP sockets", "epoll runs entirely in user mode", "io_uring cannot perform disk I/O",
                                "A", "io_uring eliminates syscall overhead by sharing submission and completion queues directly between user space and the kernel."),
                        new QuestionSeed("What occurs during a 'Thundering Herd' problem in multi-process network servers?",
                                "Multiple processes sleeping on accept() or epoll() wake up simultaneously on a single event, but only one handles it while others waste CPU", "A CPU core overheats from high clock frequencies", "Network packets are dropped due to full socket buffers", "A deadlock between network drivers and memory managers",
                                "A", "The thundering herd problem occurs when a single incoming connection causes the kernel to awaken all listening processes, causing severe lock contention."),
                        new QuestionSeed("What is an inverted page table compared to a multi-level page table?",
                                "It has one entry per physical frame rather than per virtual page, indexing by PID and page number", "It stores page tables in secondary flash memory", "It reverses virtual addresses using two's complement", "It eliminates translation lookaside buffers (TLBs)",
                                "A", "Inverted page tables scale with physical RAM size rather than process virtual address space, storing (PID, page) mappings per physical frame."),
                        new QuestionSeed("What causes a Kernel Panic in Unix/Linux operating systems?",
                                "An unrecoverable internal error in kernel space (e.g., null pointer dereference in driver or corrupted critical structures) where continued execution risks data corruption", "A user process throwing an uncaught NullPointerException", "A network interface cable being unplugged", "A full root disk partition",
                                "A", "A kernel panic occurs when supervisor-mode code encounters a fatal condition that cannot be safely handled, halting the system to protect data integrity.")
                }
        );
    }

    // ================= CHAPTER 2: CPU Scheduling & Synchronization =================
    public static QuizSeed getCh2Easy() {
        return new QuizSeed(
                "OS Ch 2: CPU Scheduling Basics (Easy)",
                "Preemptive vs non-preemptive scheduling, FCFS, SJF, and Round Robin fundamentals.",
                "EASY",
                5,
                new QuestionSeed[] {
                        new QuestionSeed("What is the primary goal of CPU scheduling in modern multiprogramming systems?",
                                "Maximize CPU utilization and minimize turnaround/waiting times", "Shut down CPU cores to save electricity", "Increase disk storage capacity", "Compile high-level code to assembly",
                                "A", "CPU scheduling optimizes CPU utilization, throughput, turnaround time, waiting time, and response time across ready processes."),
                        new QuestionSeed("Which scheduling algorithm allocates the CPU strictly in order of process arrival?",
                                "First-Come, First-Served (FCFS)", "Shortest Job First (SJF)", "Priority Scheduling", "Multilevel Feedback Queue",
                                "A", "FCFS assigns the CPU to the process that requested it first, operating as a FIFO queue."),
                        new QuestionSeed("What is the 'Convoy Effect' frequently observed in FCFS scheduling?",
                                "Short CPU-bound processes are blocked waiting behind a long CPU-intensive process, causing high average wait times", "Network packets arriving out of order", "Multiple threads modifying a shared integer", "Disks spinning at different speeds",
                                "A", "The convoy effect happens when short processes queue up behind a very long running process, drastically increasing average waiting time."),
                        new QuestionSeed("Which scheduling algorithm assigns a fixed time quantum to each process in turn?",
                                "Round Robin (RR)", "Shortest Remaining Time First (SRTF)", "Non-preemptive Priority", "Longest Job First (LJF)",
                                "A", "Round Robin gives each ready process a fixed time slice (quantum) before preempting it and placing it at the tail of the ready queue."),
                        new QuestionSeed("What are the four necessary Coffman conditions for a Deadlock to occur?",
                                "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait", "Read, Write, Execute, Delete", "Ready, Running, Waiting, Terminated", "Lock, Key, Mutex, Semaphore",
                                "A", "The four Coffman conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. If all four hold, deadlock can occur.")
                }
        );
    }

    public static QuizSeed getCh2Medium() {
        return new QuizSeed(
                "OS Ch 2: Process Synchronization & Deadlock Handling (Medium)",
                "Semaphores, mutexes, critical sections, Peterson's solution, and Banker's algorithm.",
                "MEDIUM",
                10,
                new QuestionSeed[] {
                        new QuestionSeed("What is a Critical Section in concurrent computing?",
                                "A segment of code accessing shared resources that must not be concurrently executed by multiple threads", "The boot sector of an operating system", "The memory region allocated for BIOS", "A high-priority kernel routine that cannot be interrupted",
                                "A", "A critical section is a code block where threads access shared variables or data structures; mutual exclusion must be enforced to prevent race conditions."),
                        new QuestionSeed("What are the two atomic operations provided by a Counting Semaphore?",
                                "wait() (P) and signal() (V)", "lock() and unlock()", "push() and pop()", "fork() and join()",
                                "A", "Semaphores provide wait() (decrements value or blocks if 0) and signal() (increments value and awakens a waiting process)."),
                        new QuestionSeed("What is the fundamental difference between a Mutex and a Binary Semaphore?",
                                "A Mutex has ownership (only the locking thread can unlock it); a Semaphore can be signaled by any thread", "A Mutex can take values up to 256; a Semaphore is binary only", "A Semaphore requires hardware transactional memory", "A Mutex cannot protect critical sections",
                                "A", "A mutex enforces thread ownership—the thread that acquires the mutex must be the one to release it. A semaphore has no concept of ownership."),
                        new QuestionSeed("What is Priority Inversion in real-time operating systems?",
                                "A low-priority task holds a shared resource required by a high-priority task, while an intermediate-priority task preempts the low-priority task", "High-priority tasks executing before low-priority tasks", "A priority queue implemented with an array", "Threads switching priorities at random",
                                "A", "Priority inversion occurs when a high-priority task is indirectly blocked by a medium-priority task preempting a low-priority lock holder (solved by Priority Inheritance)."),
                        new QuestionSeed("What algorithm is used for Deadlock Avoidance by determining if resource allocation leads to a Safe State?",
                                "Banker's Algorithm", "Dijkstra's Shortest Path", "Kruskal's Algorithm", "Lamport's Bakery Algorithm",
                                "A", "Dijkstra's Banker's Algorithm tests whether granting resource requests preserves a safe state from which all processes can eventually complete."),
                        new QuestionSeed("What does Peterson's Solution achieve for two concurrent processes?",
                                "Software-based mutual exclusion satisfying mutual exclusion, progress, and bounded waiting", "Hardware-accelerated transactional caching", "Automatic deadlock recovery", "Zero-copy message passing",
                                "A", "Peterson's algorithm is a classic software solution providing mutual exclusion, progress, and bounded waiting for two processes using shared flag and turn variables."),
                        new QuestionSeed("Why is Shortest Job First (SJF) scheduling theoretically optimal for minimizing average waiting time?",
                                "Because placing shorter execution times ahead of longer ones mathematically minimizes the cumulative sum of wait times", "Because it completely eliminates context switching", "Because it ignores I/O burst times", "Because it requires no CPU profiling",
                                "A", "SJF gives the lowest average waiting time because shorter jobs run first, keeping the queue length and total accumulated wait time to a minimum.")
                }
        );
    }

    public static QuizSeed getCh2Hard() {
        return new QuizSeed(
                "OS Ch 2: Advanced Schedulers & Lock-Free Concurrency (Hard)",
                "Linux CFS (Completely Fair Scheduler), memory barriers, ABA problem, and ticket spinlocks.",
                "HARD",
                15,
                new QuestionSeed[] {
                        new QuestionSeed("How does the Linux Completely Fair Scheduler (CFS) choose which task to run next?",
                                "Selects the task with the smallest virtual runtime (vruntime) tracked in a red-black tree", "Uses a FIFO priority queue with 256 static levels", "Executes the task with the highest number of child threads", "Chooses tasks at random using hardware entropy",
                                "A", "CFS tracks virtual runtime (vruntime) for each task in a balanced Red-Black tree; the leftmost node with the minimum vruntime is chosen for execution."),
                        new QuestionSeed("What is a Memory Barrier (Fence) instruction used for in multiprocessor kernels?",
                                "Prevents compiler and CPU out-of-order execution from reordering memory reads/writes across the barrier boundary", "Protects physical RAM from electrical power surges", "Locks CPU bus lines during memory defragmentation", "Encrypts cache lines in L3 cache",
                                "A", "Memory barriers enforce memory ordering constraints, ensuring that memory reads and writes prior to the fence are visible to other cores before subsequent operations."),
                        new QuestionSeed("Why are Spinlocks inefficient on single-core uniprocessor systems?",
                                "A busy-waiting thread consumes 100% CPU on the sole core, preventing the lock-holding thread from ever running to release the lock", "Spinlocks take too much RAM memory to allocate", "Single cores do not have atomic test-and-set instructions", "Spinlocks crash uniprocessor kernels",
                                "A", "On a uniprocessor, a spinning thread occupies the only CPU core, preventing the thread holding the lock from running unless preemption occurs."),
                        new QuestionSeed("What does the 'Bounded Waiting' condition guarantee in process synchronization?",
                                "There is a limit on the number of times other processes can enter their critical sections after a process has requested entry", "Threads must terminate within a specified number of clock cycles", "Locks are held for at most 1 millisecond", "Memory allocations cannot exceed 4 gigabytes",
                                "A", "Bounded waiting prevents starvation by ensuring that no requesting process can be postponed indefinitely while other processes repeatedly enter their critical sections."),
                        new QuestionSeed("How does Read-Copy-Update (RCU) achieve lock-free read performance in the Linux kernel?",
                                "Readers access data concurrently without locks; writers create a updated copy, swap pointers atomically, and reclaim old memory after a grace period", "By using hardware transactional memory for all reads", "By disabling interrupts across all CPU cores", "By serializing all readers on a central semaphore",
                                "A", "RCU allows readers to traverse data structures without synchronization overhead; writers publish copies and defer memory deletion until all concurrent readers finish."),
                        new QuestionSeed("What is a Futex Requeue operation used for in high-performance synchronization libraries?",
                                "Atomically moves waiting threads from a condition variable futex to a mutex futex to prevent the thundering herd problem", "Restarts deadlocked threads with lower priority", "Converts user threads into kernel threads", "Swaps thread stacks during fiber execution",
                                "A", "Futex requeue avoids waking all threads on a condition variable only for them to immediately block on the associated mutex; it directly transfers their wait queue in the kernel."),
                        new QuestionSeed("What is the O(1) Scheduler in Linux 2.6 and why was it eventually replaced by CFS?",
                                "It scheduled tasks in O(1) time using active/expired priority runqueues, but suffered from complex heuristic interactivity scoring", "It ran in quadratic time for large thread counts", "It could not handle symmetric multiprocessing (SMP)", "It was written in assembly language",
                                "A", "The O(1) scheduler provided constant-time selection, but relied on complex heuristic formulas to classify tasks as interactive vs batch, which led to stutter in desktop workloads."),
                        new QuestionSeed("What is the dining philosophers problem used to demonstrate in computer science?",
                                "The challenges of avoiding deadlocks and resource starvation when allocating multiple shared resources concurrently", "Cache coherence protocols in multi-socket motherboards", "Network packet routing across ring topologies", "SQL query optimization under high concurrency",
                                "A", "The Dining Philosophers problem models concurrent resource allocation among processes needing multiple resources simultaneously without deadlocking or starving."),
                        new QuestionSeed("What is NUMA (Non-Uniform Memory Access) aware CPU scheduling?",
                                "Scheduling threads on CPU cores that are physically closest to the memory nodes holding the thread's data to maximize memory bandwidth", "Running virtual machines on separate physical networks", "Distributing interrupts evenly across all cores regardless of latency", "Disabling multi-channel DDR memory controllers",
                                "A", "NUMA scheduling prioritizes executing threads on the CPU socket closest to their allocated memory nodes, avoiding expensive inter-socket interconnect traffic."),
                        new QuestionSeed("What hardware atomic primitive forms the basis of Lock-Free Linked Lists and Stacks?",
                                "Compare-And-Swap (CAS) / Load-Linked Store-Conditional (LL/SC)", "Branch Not Taken", "Shift Arithmetic Right", "Memory Write-Through",
                                "A", "CAS compares the memory location with an expected value and updates it only if matched, enabling lock-free consensus on concurrent node pointer mutations.")
                }
        );
    }

    // ================= CHAPTER 3: Memory Management & Storage Systems =================
    public static QuizSeed getCh3Easy() {
        return new QuizSeed(
                "OS Ch 3: Memory & Storage Fundamentals (Easy)",
                "Virtual memory, paging, frames, segmentation, and file system basics.",
                "EASY",
                5,
                new QuestionSeed[] {
                        new QuestionSeed("What is Virtual Memory in modern operating systems?",
                                "A memory management technique that provides each process with the illusion of a large contiguous address space backed by physical RAM and disk", "A temporary RAM disk created inside graphics cards", "Flash memory used during operating system installation", "An encrypted cloud backup of user files",
                                "A", "Virtual memory decouples logical program addresses from physical hardware memory, providing protection, isolation, and larger apparent memory via disk backing."),
                        new QuestionSeed("What is the difference between a 'Page' and a 'Frame'?",
                                "A Page is a fixed-size block of virtual memory; a Frame is a fixed-size block of physical RAM", "A Frame is virtual; a Page is physical", "Pages exist on hard disks only; Frames are in CPU registers", "There is no difference",
                                "A", "Virtual address space is divided into Pages, while physical memory (RAM) is divided into Frames of identical size (typically 4 KB)."),
                        new QuestionSeed("What hardware component translates virtual memory addresses into physical RAM addresses?",
                                "MMU (Memory Management Unit)", "ALU (Arithmetic Logic Unit)", "DMA Controller", "Southbridge chipset",
                                "A", "The Memory Management Unit (MMU) uses page tables and TLBs to translate virtual addresses generated by the CPU into physical hardware addresses."),
                        new QuestionSeed("What is a 'Page Fault'?",
                                "An interrupt raised by hardware when a program accesses a virtual page that is not currently mapped into physical RAM", "A physical electrical failure of a RAM DIMM stick", "An invalid write to a read-only variable", "A CPU overheating warning",
                                "A", "A page fault occurs when a referenced virtual page is not in physical memory, causing the OS to load the required page from disk swap space."),
                        new QuestionSeed("Which page replacement algorithm replaces the page that has not been accessed for the longest time?",
                                "Least Recently Used (LRU)", "First-In, First-Out (FIFO)", "Optimal (OPT)", "Random Replacement",
                                "A", "LRU replaces the page in memory that has remained unreferenced for the greatest duration of time.")
                }
        );
    }

    public static QuizSeed getCh3Medium() {
        return new QuizSeed(
                "OS Ch 3: Paging Schemes & Storage Systems (Medium)",
                "Multi-level page tables, TLB hits/misses, Belady's anomaly, thrashing, and RAID levels.",
                "MEDIUM",
                10,
                new QuestionSeed[] {
                        new QuestionSeed("What is the Translation Lookaside Buffer (TLB)?",
                                "A fast hardware cache inside the CPU that stores recent virtual-to-physical address translations", "A buffer in RAM storing disk sector blocks", "A queue for pending I/O requests", "A table storing open file handles",
                                "A", "The TLB is an associative hardware cache in the MMU that drastically accelerates address translation by avoiding repeated multi-level page table lookups."),
                        new QuestionSeed("What is 'Thrashing' in virtual memory systems?",
                                "A condition where the OS spends more time swapping pages in and out of disk than executing instructions due to insufficient physical memory", "A CPU running at maximum clock frequency continuously", "A hard disk head crashing onto magnetic platters", "Malware encrypting files on the root partition",
                                "A", "Thrashing occurs when the collective working sets of active processes exceed available physical RAM, causing constant page fault disk I/O."),
                        new QuestionSeed("What is Belady's Anomaly in page replacement algorithms?",
                                "In FIFO replacement, increasing the number of page frames can unexpectedly increase the total number of page faults", "LRU replacement failing on small workloads", "Optimal algorithm requiring infinite future knowledge", "A page table exceeding 4 gigabytes",
                                "A", "Belady's Anomaly proves that for certain access strings, allocating more physical page frames using FIFO results in more page faults instead of fewer."),
                        new QuestionSeed("What is the primary difference between Internal and External Fragmentation?",
                                "Internal fragmentation is unused memory within an allocated fixed block; external fragmentation is free memory scattered between blocks", "Internal occurs on disk; external occurs in CPU registers", "External fragmentation only happens with paging; internal only with segmentation", "Internal fragmentation is resolved by defragmentation tools",
                                "A", "Internal fragmentation occurs when allocated partitions are larger than requested data (e.g., 4KB page storing 100 bytes); external fragmentation is non-contiguous scattered free memory."),
                        new QuestionSeed("What is RAID 5 and how does it achieve fault tolerance?",
                                "Block-level striping with distributed parity across three or more disks, surviving the failure of a single drive", "Mirroring across two identical drives without striping", "Pure striping across two disks with zero redundancy", "Dedicated parity disk with non-striped data",
                                "A", "RAID 5 stripes data across at least 3 drives and distributes parity blocks across all drives, allowing data reconstruction if one drive fails."),
                        new QuestionSeed("What is an 'Inode' in Unix file systems (ext4)?",
                                "A data structure storing file metadata (permissions, owner, size, timestamps, data block pointers) excluding the file name", "The directory containing user home folders", "A backup copy of the master boot record", "A network socket endpoint",
                                "A", "An inode contains file attributes and disk block pointers; directory entries map human-readable file names to their corresponding inode numbers."),
                        new QuestionSeed("How does Direct Memory Access (DMA) improve system I/O performance?",
                                "Allows hardware devices to transfer data directly to/from main memory without routing every byte through the CPU", "Doubles the clock frequency of the PCIe bus", "Eliminates hard disk rotational latency", "Caches all network traffic in L1 CPU cache",
                                "A", "DMA allows high-speed I/O controllers to read and write RAM directly, freeing the CPU to execute process instructions while transfers occur.")
                }
        );
    }

    public static QuizSeed getCh3Hard() {
        return new QuizSeed(
                "OS Ch 3: Advanced Virtual Memory & File Systems (Hard)",
                "Huge pages, page cache writeback, copy-on-write, journaling file systems, and TRIM.",
                "HARD",
                15,
                new QuestionSeed[] {
                        new QuestionSeed("What advantage do 'Huge Pages' (e.g., 2MB or 1GB) provide in high-performance databases and hypervisors?",
                                "Reduces TLB miss rates and page table memory overhead by covering vastly more memory per TLB entry", "Compresses RAM by 50% using hardware deduplication", "Prevents memory fragmentation completely", "Allows processes to bypass kernel memory protection",
                                "A", "Huge pages allow a single TLB entry to map 2MB or 1GB instead of 4KB, reducing TLB cache pressure and accelerating memory-intensive workloads."),
                        new QuestionSeed("What is the difference between Ext4 Journaling modes: Journal, Ordered, and Writeback?",
                                "Journal writes metadata and data to journal; Ordered journals metadata after data is in filesystem; Writeback journals metadata with no data ordering guarantees", "Ordered mode disables disk caching", "Writeback writes everything synchronously to flash", "Journal mode only works with SSDs",
                                "A", "Journal mode provides maximum crash safety at high write overhead; Ordered mode is the default balancing data integrity and speed; Writeback offers maximum speed with potential stale data on crash."),
                        new QuestionSeed("Why is the SSD TRIM command critical for flash storage performance and longevity?",
                                "Informs the SSD controller which logical blocks no longer contain valid data, enabling efficient background garbage collection and wear leveling", "Overclocks the NAND flash memory cells", "Formats the partition table with FAT32", "Defragments magnetic spinning platters",
                                "A", "TRIM allows the OS to notify the SSD when pages are freed, enabling the flash translation layer (FTL) to erase blocks in advance without expensive read-modify-write cycles."),
                        new QuestionSeed("What is a Hard Link compared to a Symbolic (Soft) Link in Unix file systems?",
                                "A hard link is a direct directory reference to an existing inode number; a symbolic link is a separate file whose content is the path string of the target", "Hard links can span across different mounted filesystems", "Deleting the original file breaks hard links", "Soft links share the same inode number as the target",
                                "A", "A hard link points to the same inode (incrementing link count); a symlink is a separate file containing a path reference that breaks if the target is moved or deleted."),
                        new QuestionSeed("What is the Working Set Model formulated by Peter Denning for page replacement?",
                                "The set of unique pages referenced by a process during a sliding time window Δ, used to prevent thrashing", "The set of open file descriptors in a process", "The total size of the process heap and stack", "The number of threads assigned to a thread pool",
                                "A", "The Working Set Model defines W(t, Δ) as pages accessed in time window Δ; if the sum of all working sets exceeds physical memory, the OS suspends processes to avoid thrashing."),
                        new QuestionSeed("In x86-64 4-level paging, how is a 48-bit canonical virtual address broken down?",
                                "9 bits PML4, 9 bits PDPT, 9 bits Page Directory, 9 bits Page Table, 12 bits Page Offset (4KB)", "16 bits segment, 16 bits page, 16 bits offset", "24 bits page, 24 bits offset", "10 bits directory, 10 bits table, 12 bits offset",
                                "A", "x86-64 48-bit virtual addresses use four 9-bit indices (512 entries per 4KB table page) plus a 12-bit offset (4096 bytes per page)."),
                        new QuestionSeed("What is the role of the Linux OOM (Out-of-Memory) Killer?",
                                "Inspects processes, calculates badness scores (based on memory usage and oom_score_adj), and terminates a victim process to prevent system deadlock", "Restarts the server when RAM reaches 90% utilization", "Compresses active memory into zRAM blocks", "Refuses new network connections until memory is freed",
                                "A", "When available physical memory and swap are exhausted, the OOM Killer scores processes and terminates the highest-scoring candidate to reclaim memory."),
                        new QuestionSeed("What does 'Zero-Copy' socket transmission (such as sendfile()) achieve?",
                                "Transfers data directly from disk page cache to network socket buffers via DMA, bypassing user-space buffer copies", "Transfers data without calculating TCP checksums", "Disables network encryption to achieve line-rate throughput", "Copies data directly into CPU L1 cache",
                                "A", "sendfile() transfers file data directly from the kernel page cache to socket buffers without copying bytes into user-space memory, saving CPU cycles and memory bus bandwidth."),
                        new QuestionSeed("What is the difference between Write-Through and Write-Back caching strategies?",
                                "Write-Through writes immediately to both cache and backing storage; Write-Back updates cache and marks dirty, flushing to backing storage later", "Write-Back writes to disk first before updating RAM", "Write-Through is only used for solid-state drives", "Write-Back does not require cache replacement policies",
                                "A", "Write-through guarantees immediate persistence but has higher write latency; write-back offers lower latency by batching writes from dirty cache lines."),
                        new QuestionSeed("What is Second-Chance (Clock) Page Replacement Algorithm?",
                                "An approximation of LRU that inspects reference bits arranged in a circular list, giving pages with bit=1 a second chance by resetting bit to 0", "An algorithm that runs twice whenever a page fault occurs", "A predictive scheduler using system clock interrupts", "A memory garbage collector for C++ runtimes",
                                "A", "The Clock algorithm sweeps a pointer over page frames; if reference bit is 1, it sets it to 0 and advances; if 0, it selects that frame for replacement.")
                }
        );
    }
}
