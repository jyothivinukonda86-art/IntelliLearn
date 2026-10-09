package com.learningplatform.config;

import com.learningplatform.config.QuizSeed.QuestionSeed;

public class DbmsQuizData {

    // ================= CHAPTER 1: Relational Model & SQL =================
    public static QuizSeed getCh1Easy() {
        return new QuizSeed(
                "DBMS Ch 1: SQL Basics (Easy)",
                "Fundamental concepts of database tables, keys, and elementary SQL queries.",
                "EASY",
                5,
                new QuestionSeed[] {
                        new QuestionSeed("What does SQL stand for?",
                                "Structured Query Language", "Sequential Query Logic", "System Question Language", "Standard Quality Language",
                                "A", "SQL stands for Structured Query Language, the standardized domain-specific language for relational database management."),
                        new QuestionSeed("Which SQL clause is used to extract only unique records from a query result?",
                                "UNIQUE", "DISTINCT", "DIFFERENT", "ISOLATE",
                                "B", "The SELECT DISTINCT statement is used to return only unique (distinct) values across specified columns."),
                        new QuestionSeed("Which primary key constraint attribute ensures that a column cannot have unassigned data?",
                                "NOT NULL", "CHECK", "DEFAULT", "CASCADE",
                                "A", "Primary key columns must contain unique values and inherently cannot contain NULL values (enforced via NOT NULL)."),
                        new QuestionSeed("Which SQL keyword is used to sort the fetched result set?",
                                "SORT BY", "ORDER BY", "ARRANGE", "GROUP BY",
                                "B", "The ORDER BY keyword sorts results in ascending (ASC, default) or descending (DESC) order."),
                        new QuestionSeed("Which DDL command permanently removes a table along with its schema and indexes?",
                                "DELETE TABLE", "REMOVE TABLE", "DROP TABLE", "TRUNCATE",
                                "C", "DROP TABLE completely removes the table definition, data, constraints, and indexes from the database.")
                }
        );
    }

    public static QuizSeed getCh1Medium() {
        return new QuizSeed(
                "DBMS Ch 1: Joins & Aggregations (Medium)",
                "Relational joins, grouping constructs, filtering with HAVING, and subqueries.",
                "MEDIUM",
                10,
                new QuestionSeed[] {
                        new QuestionSeed("What is the primary difference between WHERE and HAVING in SQL?",
                                "WHERE filters rows before aggregation; HAVING filters aggregated groups", "HAVING filters rows before aggregation; WHERE filters groups", "HAVING can only be used with primary keys", "WHERE can only be used in subqueries",
                                "A", "The WHERE clause filters individual rows before grouping, while the HAVING clause filters groups produced by GROUP BY."),
                        new QuestionSeed("Which JOIN returns all rows from the left table and matched rows from the right table?",
                                "INNER JOIN", "LEFT OUTER JOIN", "RIGHT OUTER JOIN", "CROSS JOIN",
                                "B", "LEFT OUTER JOIN returns all records from the left table and the matching records from the right table (or NULL if no match)."),
                        new QuestionSeed("What is the result of a CROSS JOIN between a table with 5 rows and a table with 4 rows?",
                                "9 rows", "20 rows", "1 row", "0 rows",
                                "B", "A CROSS JOIN produces a Cartesian product, generating 5 * 4 = 20 total rows."),
                        new QuestionSeed("What does a correlated subquery in SQL do?",
                                "Runs once before the outer query executes", "References columns from the outer query and re-evaluates for each outer row", "Executes concurrently on a secondary replica", "Replaces stored procedures in views",
                                "B", "A correlated subquery references a column from the outer query and must be evaluated once for each row processed by the outer query."),
                        new QuestionSeed("Which aggregate function ignores NULL values when calculating the total count of an attribute?",
                                "COUNT(*)", "COUNT(column_name)", "SUM() only", "All functions count NULLs",
                                "B", "COUNT(column_name) counts non-NULL entries in that column, whereas COUNT(*) counts all rows including those with NULLs."),
                        new QuestionSeed("What happens when an ON DELETE CASCADE constraint is defined on a foreign key?",
                                "Child rows are deleted automatically when their referenced parent row is deleted", "The parent row deletion is rejected with an error", "Child foreign keys are set to NULL", "The deletion is queued for batch execution",
                                "A", "ON DELETE CASCADE guarantees that if a row in the parent table is deleted, all corresponding matching rows in the child table are also automatically deleted."),
                        new QuestionSeed("Which SQL operation combines the result sets of two queries and removes duplicate records?",
                                "UNION ALL", "UNION", "INTERSECT ALL", "COMBINE",
                                "B", "UNION merges rows from two queries and filters out duplicate rows, whereas UNION ALL preserves duplicates without deduplication overhead.")
                }
        );
    }

    public static QuizSeed getCh1Hard() {
        return new QuizSeed(
                "DBMS Ch 1: Relational Algebra & Advanced SQL (Hard)",
                "Relational calculus, set operators, window functions, and query optimization.",
                "HARD",
                15,
                new QuestionSeed[] {
                        new QuestionSeed("In Relational Algebra, what symbol represents the selection operation?",
                                "π (Pi)", "σ (Sigma)", "⋈ (Bowtie)", "ρ (Rho)",
                                "B", "The lowercase Greek letter Sigma (σ) denotes the selection predicate which filters tuples satisfying a condition."),
                        new QuestionSeed("What is the difference between RANK() and DENSE_RANK() window functions in SQL?",
                                "RANK leaves gaps in rankings after ties; DENSE_RANK does not leave gaps", "DENSE_RANK leaves gaps; RANK does not", "RANK only works with numbers", "There is no difference",
                                "A", "If two rows tie for 1st place, RANK assigns 1, 1, 3 (skipping 2), whereas DENSE_RANK assigns 1, 1, 2 (no gaps)."),
                        new QuestionSeed("What does the LEAD() window function compute in SQL:2003?",
                                "Accesses data from a subsequent row at a specified physical offset without a self-join", "Fetches the highest value in the window frame", "Calculates cumulative distribution percentage", "Returns the first non-null element in a partition",
                                "A", "LEAD(column, offset) allows querying a forward row within the current partition without performing a self-join."),
                        new QuestionSeed("Which Relational Algebra operator is equivalent to the Cartesian product followed by selection on equality?",
                                "Natural Join", "Equi-Join", "Theta Join", "Outer Join",
                                "B", "An Equi-Join uses equality comparisons in the selection condition applied over the Cartesian product."),
                        new QuestionSeed("What is tuple relational calculus (TRC) classified as?",
                                "A procedural query language", "A non-procedural declarative query language", "A physical storage indexing language", "An imperative query compilation model",
                                "B", "Tuple Relational Calculus is a non-procedural declarative formal query language that describes what information is desired rather than how to retrieve it."),
                        new QuestionSeed("In an execution plan, what does a 'Hash Join' algorithm typically require?",
                                "Pre-sorted inputs on both sides", "Building an in-memory hash table on the smaller build input, then probing with the probe input", "A clustered B-tree index on both tables", "A temporary table created in tempdb disk storage",
                                "B", "A Hash Join reads the smaller table into an in-memory hash table (build phase) and then streams the larger table to probe matches (probe phase)."),
                        new QuestionSeed("What is the purpose of the COALESCE() scalar function in SQL?",
                                "Returns the first non-NULL expression among its arguments", "Replaces strings matching a regular expression", "Combines two columns into a JSON array", "Converts empty strings to NULL",
                                "A", "COALESCE(val1, val2, ...) evaluates arguments in order and returns the current value of the first expression that does not evaluate to NULL."),
                        new QuestionSeed("What does a Common Table Expression (CTE) defined with the RECURSIVE keyword enable?",
                                "Hierarchical or graph traversal queries such as organizational charts or bill-of-materials", "Parallel multi-threaded inserts", "Zero-downtime schema migrations", "Lock-free analytical reporting",
                                "A", "A recursive CTE references itself to iteratively evaluate hierarchical or graph-structured relations until the termination condition is met."),
                        new QuestionSeed("Which SQL isolation anomaly occurs when query Q reads rows satisfying a condition, and a concurrent transaction inserts a new row satisfying that condition and commits?",
                                "Dirty Read", "Non-repeatable Read", "Phantom Read", "Lost Update",
                                "C", "A Phantom Read occurs when a transaction queries a range of rows twice and sees newly inserted or deleted rows from another committed transaction."),
                        new QuestionSeed("What is the result of selecting NULL = NULL in standard SQL three-valued logic?",
                                "TRUE", "FALSE", "UNKNOWN", "ERROR",
                                "C", "In SQL three-valued logic, comparing NULL with any value (including NULL) using equality evaluates to UNKNOWN.")
                }
        );
    }

    // ================= CHAPTER 2: Normalization & Indexing =================
    public static QuizSeed getCh2Easy() {
        return new QuizSeed(
                "DBMS Ch 2: Normalization Fundamentals (Easy)",
                "Anomalies, functional dependencies, 1NF, 2NF, and basic B-tree index concepts.",
                "EASY",
                5,
                new QuestionSeed[] {
                        new QuestionSeed("What is the primary objective of database normalization?",
                                "Increase query response latency", "Minimize data redundancy and avoid update anomalies", "Encrypt sensitive data columns", "Merge all tables into a single denormalized view",
                                "B", "Normalization organizes tables to reduce data duplication and prevent insertion, update, and deletion anomalies."),
                        new QuestionSeed("A table is in First Normal Form (1NF) if and only if:",
                                "It has no partial dependencies", "All column attributes contain atomic (indivisible) values", "It has no transitive dependencies", "Every determinant is a candidate key",
                                "B", "1NF requires that each column contains atomic values with no repeating groups or composite arrays."),
                        new QuestionSeed("Second Normal Form (2NF) eliminates which type of dependency?",
                                "Transitive dependency", "Partial functional dependency on a composite primary key", "Multivalued dependency", "Join dependency",
                                "B", "2NF requires 1NF and ensures all non-prime attributes are fully functionally dependent on the entire candidate key."),
                        new QuestionSeed("What data structure is most commonly used for relational database indexes?",
                                "B-Tree / B+ Tree", "Singly Linked List", "Min Heap", "Circular Queue",
                                "A", "B-Tree and B+ Tree structures offer balanced search, insert, and range scan performance in O(log N) disk block I/O operations."),
                        new QuestionSeed("How many Clustered Indexes can exist on a single database table?",
                                "Unlimited", "Only one", "Up to 16", "One per foreign key",
                                "B", "Because a clustered index dictates the physical sorting order of rows on disk, a table can possess only one clustered index.")
                }
        );
    }

    public static QuizSeed getCh2Medium() {
        return new QuizSeed(
                "DBMS Ch 2: Advanced Normal Forms & Index Design (Medium)",
                "3NF, BCNF, functional dependency closure, index selectivity, and composite indexes.",
                "MEDIUM",
                10,
                new QuestionSeed[] {
                        new QuestionSeed("A relation is in Third Normal Form (3NF) if it is in 2NF and has no:",
                                "Partial dependencies", "Transitive functional dependencies", "Atomic values", "Candidate keys",
                                "B", "3NF eliminates transitive dependencies where a non-prime attribute depends on another non-prime attribute (X -> Y and Y -> Z)."),
                        new QuestionSeed("Under Boyce-Codd Normal Form (BCNF), for every non-trivial functional dependency X -> Y:",
                                "Y must be a prime attribute", "X must be a superkey", "X must be in 2NF", "Y must not contain NULLs",
                                "B", "BCNF is a stricter version of 3NF requiring that for every functional dependency X -> Y, the determinant X must be a superkey."),
                        new QuestionSeed("What is an Insertion Anomaly?",
                                "Inability to record certain facts without adding unrelated dummy records", "Inadvertent loss of data when deleting a tuple", "Inconsistent duplicate rows after an update", "Lock contention preventing transaction commits",
                                "A", "An insertion anomaly occurs when data cannot be recorded because other dependent attributes are not yet available."),
                        new QuestionSeed("What is a Clustered Index compared to a Non-Clustered Index?",
                                "A clustered index stores data pages directly at leaf nodes; non-clustered index leaves contain row pointers", "A non-clustered index rearranges physical storage", "Clustered indexes are slower for range queries", "A non-clustered index can only index integers",
                                "A", "In a clustered index, the leaf nodes ARE the physical data pages, whereas non-clustered index leaf nodes contain pointers (RID or clustering key) to the rows."),
                        new QuestionSeed("What is a 'Covering Index' in query optimization?",
                                "An index that includes all columns referenced by a query, avoiding base table lookups", "An index that hides table schema from untrusted clients", "An index built over encrypted columns", "An index that encompasses multiple foreign database servers",
                                "A", "A covering index contains all columns requested by a SELECT, WHERE, and JOIN query, allowing the engine to satisfy the query purely from index leaves."),
                        new QuestionSeed("What is the Leftmost Prefix Rule in composite B-Tree indexes on columns (A, B, C)?",
                                "Queries filtering by B and C alone can utilize the index efficiently", "Queries must filter on column A to take advantage of the composite index tree", "The index can only sort by column C", "The engine reverses search keys automatically",
                                "B", "A composite index on (A, B, C) can only be used by queries that specify predicates on the leftmost column (A), or (A, B), or (A, B, C)."),
                        new QuestionSeed("Given functional dependencies A -> B and B -> C, what inference rule proves A -> C?",
                                "Augmentation rule", "Transitivity rule", "Decomposition rule", "Pseudotransitivity rule",
                                "B", "Armstrong's transitivity axiom states that if X -> Y and Y -> Z hold, then X -> Z also holds.")
                }
        );
    }

    public static QuizSeed getCh2Hard() {
        return new QuizSeed(
                "DBMS Ch 2: Normalization Theory & Storage Engines (Hard)",
                "Minimal covers, lossy vs lossless joins, 4NF, 5NF, and LSM trees vs B+ trees.",
                "HARD",
                15,
                new QuestionSeed[] {
                        new QuestionSeed("When is a relational decomposition into R1 and R2 guaranteed to be a Lossless-Join Decomposition?",
                                "R1 ∪ R2 contains all functional dependencies", "(R1 ∩ R2) -> R1 or (R1 ∩ R2) -> R2", "R1 and R2 have disjoint sets of attributes", "Both R1 and R2 are in BCNF",
                                "B", "Decomposition of R into R1 and R2 is lossless if and only if the intersection of attributes contains a candidate key for at least one of the decomposed relations."),
                        new QuestionSeed("What type of anomaly does Fourth Normal Form (4NF) specifically eliminate?",
                                "Multivalued dependencies (MVDs)", "Join dependencies", "Transitive functional dependencies", "Partial key dependencies",
                                "A", "4NF eliminates non-trivial multivalued dependencies (X ->-> Y) where attributes are independent of each other."),
                        new QuestionSeed("What characterizes Fifth Normal Form (5NF), also known as Project-Join Normal Form (PJNF)?",
                                "No transitive dependencies across composite keys", "Elimination of join dependencies not implied by candidate keys", "Strict avoidance of all foreign key constraints", "Denormalization into star schemas",
                                "B", "5NF deals with cases where a relation can be reconstructed from multiple smaller projections without introducing spurious tuples."),
                        new QuestionSeed("Why are B+ Trees preferred over standard B-Trees in relational database storage engines?",
                                "All data pointers reside strictly in leaf nodes, allowing sequential linked scans and denser internal nodes", "B+ Trees have lower memory consumption during inserts", "B+ Trees eliminate the need for write-ahead logging", "B+ Trees do not require rebalancing",
                                "A", "In B+ Trees, internal nodes only store routing keys, maximizing fan-out, while leaf nodes form a doubly linked list for optimal range scans."),
                        new QuestionSeed("What is an LSM-Tree (Log-Structured Merge-Tree) optimized for compared to a B-Tree?",
                                "High write throughput by transforming random disk writes into sequential append-only writes", "Low-latency random point lookups", "Eliminating secondary index overhead", "Minimizing storage compaction CPU usage",
                                "A", "LSM-Trees buffer writes in memory (MemTable) and flush sequentially to immutable disk files (SSTables), providing superior write performance."),
                        new QuestionSeed("What is a Cardinality ratio in the context of query optimizer index selection?",
                                "The ratio of null values to non-null values", "The number of unique values in a column relative to total row count", "The physical storage size of leaf pages", "The number of foreign keys per table",
                                "B", "Column cardinality is the count of distinct values. High cardinality columns (like UUID or email) have high selectivity, making indexes very effective."),
                        new QuestionSeed("What is canonical cover (minimal cover) of a set of functional dependencies?",
                                "A simplified equivalent set of FDs with no redundant dependencies and no extraneous attributes", "The union of all possible functional dependencies", "The set of all candidate keys", "The transitive closure of a relation's schema",
                                "A", "A canonical cover Fc of F is a minimal set of FDs having no extraneous attributes and no redundant FDs, producing the same closure as F."),
                        new QuestionSeed("What problem occurs when a B+ Tree leaf page becomes full during an INSERT operation?",
                                "Page Split, allocating a new page and promoting the median key to the parent node", "Buffer pool eviction deadlock", "Row-level cascading delete", "Table truncation warning",
                                "A", "When a B+ tree page exceeds capacity, it splits into two half-filled pages and inserts the middle separator key into its parent node."),
                        new QuestionSeed("How does an Index Skip Scan work in modern database engines?",
                                "It skips checking primary key constraints during bulk loading", "It navigates a composite index when the leading column is omitted but has low cardinality", "It reads disk sectors directly by bypassing the buffer cache", "It converts B-trees into hash indexes at runtime",
                                "B", "Index Skip Scan allows the engine to utilize a composite index even if the query does not specify the leading column, by iterating over each distinct value of the prefix."),
                        new QuestionSeed("What does the Chase Algorithm determine in relational database theory?",
                                "Whether a decomposition is lossless and whether functional dependencies are preserved", "The execution time of a recursive CTE", "The optimal lock escalation hierarchy", "The shortest path in a graph database",
                                "A", "The Chase algorithm is a tableau-based decision procedure used to test whether a relational decomposition is lossless with respect to a set of dependencies.")
                }
        );
    }

    // ================= CHAPTER 3: Transactions & Concurrency =================
    public static QuizSeed getCh3Easy() {
        return new QuizSeed(
                "DBMS Ch 3: Transaction Basics (Easy)",
                "ACID properties, commit and rollback commands, and transaction lifecycle states.",
                "EASY",
                5,
                new QuestionSeed[] {
                        new QuestionSeed("Which acronym defines the four essential properties of a database transaction?",
                                "BASE", "ACID", "REST", "CRUD",
                                "B", "ACID stands for Atomicity, Consistency, Isolation, and Durability, ensuring reliable transaction processing."),
                        new QuestionSeed("What does the 'Atomicity' property ensure?",
                                "Transactions run completely in parallel", "All operations within a transaction succeed together, or none take effect (All or Nothing)", "Data is instantly backed up offsite", "Records cannot be modified simultaneously",
                                "B", "Atomicity guarantees that all changes within a transaction are completed as a single indivisible unit, or completely rolled back if an error occurs."),
                        new QuestionSeed("Which command is used to permanently save all changes made during the current transaction?",
                                "SAVEPOINT", "ROLLBACK", "COMMIT", "PREPARE",
                                "C", "The COMMIT command saves all modifications made during the transaction permanently to disk storage."),
                        new QuestionSeed("What happens when a ROLLBACK command is executed?",
                                "The database restarts", "All changes made since the last commit or savepoint are discarded", "The schema is reset to factory defaults", "Foreign keys are temporarily disabled",
                                "B", "ROLLBACK cancels transaction modifications and restores data to the state prior to the transaction or specified savepoint."),
                        new QuestionSeed("Which ACID property ensures that committed changes persist even if the system crashes or loses power?",
                                "Atomicity", "Consistency", "Isolation", "Durability",
                                "D", "Durability ensures that once a transaction has committed, its updates survive system crashes and power failures, typically achieved via Write-Ahead Logging.")
                }
        );
    }

    public static QuizSeed getCh3Medium() {
        return new QuizSeed(
                "DBMS Ch 3: Concurrency Control & Isolation (Medium)",
                "Transaction isolation levels, two-phase locking, dirty reads, and deadlock detection.",
                "MEDIUM",
                10,
                new QuestionSeed[] {
                        new QuestionSeed("Which SQL transaction isolation level offers the highest degree of data consistency?",
                                "READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE",
                                "D", "SERIALIZABLE is the highest isolation level, executing transactions with behavior equivalent to a purely serial non-concurrent schedule."),
                        new QuestionSeed("What is a 'Dirty Read' anomaly?",
                                "A transaction reads uncommitted modifications made by another concurrent transaction", "A transaction modifies rows deleted by another user", "Two transactions read the same data simultaneously", "A transaction reads corrupted disk blocks",
                                "A", "A dirty read occurs when Transaction A views modifications made by Transaction B before Transaction B has committed; if B aborts, A read phantom data."),
                        new QuestionSeed("What are the two phases in the Two-Phase Locking (2PL) protocol?",
                                "Growing phase (locks acquired) and Shrinking phase (locks released)", "Commit phase and Abort phase", "Shared phase and Exclusive phase", "Validation phase and Write phase",
                                "A", "In 2PL, a transaction acquires locks during the Growing phase and releases locks during the Shrinking phase; no lock can be acquired once releasing begins."),
                        new QuestionSeed("What does Strict 2PL guarantee that basic 2PL does not?",
                                "Prevents cascading rollbacks by holding all exclusive locks until transaction commit or abort", "Eliminates all deadlocks automatically", "Permits concurrent writes without locks", "Reduces lock wait timeouts to zero",
                                "A", "Strict 2PL requires all exclusive (write) locks to be held until the transaction finishes, ensuring recoverable and cascadeless execution."),
                        new QuestionSeed("How does a database engine detect deadlocks between transactions?",
                                "By polling network latency", "By analyzing the Wait-For Graph for cycles", "By restarting the server every hour", "By disabling concurrent updates",
                                "B", "A deadlock is detected by inspecting the Wait-For Graph (where nodes represent transactions and edges represent lock waits); a directed cycle indicates deadlock."),
                        new QuestionSeed("What is the difference between a Shared Lock (S-Lock) and an Exclusive Lock (X-Lock)?",
                                "Multiple transactions can hold S-locks concurrently; only one transaction can hold an X-lock", "S-locks are for writing; X-locks are for reading", "X-locks do not block S-locks", "S-locks are stored in RAM; X-locks on disk",
                                "A", "Shared (S) locks permit multiple readers simultaneously, whereas Exclusive (X) locks grant exclusive write permissions, blocking both other readers and writers."),
                        new QuestionSeed("What is the role of Write-Ahead Logging (WAL) in database durability?",
                                "Log records must be written to stable non-volatile storage before corresponding dirty data pages are flushed to disk", "Writes are cached in memory and discarded after power off", "All read queries are logged for audit compliance", "Transactions write directly to database tables without logging",
                                "A", "The WAL protocol dictates that modification logs must be flushed to stable storage before data pages are written, enabling crash recovery.")
                }
        );
    }

    public static QuizSeed getCh3Hard() {
        return new QuizSeed(
                "DBMS Ch 3: MVCC, Serializability & ARIES Recovery (Hard)",
                "Conflict serializability, view serializability, MVCC snapshots, undo/redo logs, and ARIES.",
                "HARD",
                15,
                new QuestionSeed[] {
                        new QuestionSeed("When is a concurrent transaction schedule defined as Conflict Serializable?",
                                "If it is conflict-equivalent to some serial schedule, proven by an acyclic precedence (serialization) graph", "If all transactions commit within 100 milliseconds", "If no locks are held during execution", "If every transaction uses READ COMMITTED isolation",
                                "A", "A schedule is conflict serializable if swapping non-conflicting operations transforms it into a serial schedule, which occurs if and only if its precedence graph has no directed cycles."),
                        new QuestionSeed("How does Multi-Version Concurrency Control (MVCC) eliminate read-write blocking?",
                                "Readers read immutable historical snapshot versions of rows while writers create newer versions with commit timestamps", "Writers take exclusive memory locks and abort all readers", "Readers run on isolated read replicas only", "MVCC converts all transactions into batch jobs",
                                "A", "MVCC provides statement or transaction-level point-in-time snapshots, meaning readers never block writers and writers never block readers."),
                        new QuestionSeed("What are the three distinct phases of the ARIES crash recovery algorithm?",
                                "Analysis, Redo, and Undo", "Prepare, Commit, and Acknowledge", "Scan, Filter, and Project", "Growing, Shrinking, and Aborting",
                                "A", "The ARIES algorithm executes Analysis (determines dirty pages and active transactions at crash), Redo (repeats history to reconstruct state), and Undo (rolls back uncommitted transactions)."),
                        new QuestionSeed("What does Write Skew anomaly represent in Snapshot Isolation?",
                                "Two concurrent transactions read overlapping data sets, make disjoint updates based on that data, and commit, violating a global constraint", "A transaction overwrites another transaction's uncommitted write", "A transaction fails to write to the WAL buffer", "Two threads update the same row simultaneously",
                                "A", "Write skew occurs under snapshot isolation when transactions read the same data, modify different rows to enforce a constraint (e.g., at least one doctor on call), and both commit, violating the constraint."),
                        new QuestionSeed("What is the role of a Compensation Log Record (CLR) during the Undo phase of crash recovery?",
                                "Records the undoing of an operation so that if the system crashes during recovery, undos are not repeated", "Notifies connected clients of a successful commit", "Clears the active lock table in memory", "Backs up archived transaction logs",
                                "A", "CLRs log actions taken while rolling back an aborted transaction; their UndoNextLSN pointer prevents repeating rollback work during subsequent recovery crashes."),
                        new QuestionSeed("In the Wait-Die and Wound-Wait deadlock prevention schemes, how are priorities established?",
                                "Based on transaction timestamps, where older transactions have higher priority than younger transactions", "Based on the number of rows modified", "Based on user credentials and roles", "Randomly assigned by the query planner",
                                "A", "Both schemes use monotonically increasing transaction start timestamps so older transactions (smaller timestamps) have priority, preventing circular wait conditions."),
                        new QuestionSeed("What is the purpose of Checkpointing in database transaction management?",
                                "Flushes dirty buffer pool pages to disk and records an LSN so recovery does not need to scan the entire log history from the beginning", "Defragments B+ tree index pages every minute", "Locks all client connections during backup", "Validates referential integrity constraints",
                                "A", "Checkpoints establish known points from which the system can safely start the redo phase, drastically reducing crash recovery time."),
                        new QuestionSeed("What does the Two-Phase Commit (2PC) protocol achieve in distributed databases?",
                                "Atomic commitment across multiple distributed nodes ensuring all nodes commit or all abort", "Doubles transaction throughput through replication", "Enforces asynchronous eventual consistency across shards", "Encrypts inter-node network communications",
                                "A", "2PC coordinates distributed nodes through a Prepare phase (voting) and a Commit/Abort phase, ensuring atomic transactions across network partitions."),
                        new QuestionSeed("Under Snapshot Isolation, how is the 'First-Committer-Wins' rule enforced?",
                                "If two concurrent transactions attempt to update the same row, the first transaction to commit succeeds; the second aborts", "The transaction with the lower thread ID always commits", "Writers are queued sequentially on a mutex", "The database automatically merges conflicting column edits",
                                "A", "To prevent lost updates under snapshot isolation, if transaction T2 tries to commit changes to a row already modified and committed by concurrent transaction T1, T2 is aborted."),
                        new QuestionSeed("Why is View Serializability rarely implemented in commercial database engines compared to Conflict Serializability?",
                                "Determining whether a schedule is view serializable is an NP-complete problem", "View serializability allows dirty reads", "View serializability requires distributed transactions", "View serializability can only handle single-table updates",
                                "A", "Testing for view serializability is computationally NP-complete, whereas conflict serializability can be verified in polynomial time O(V + E) using cycle detection.")
                }
        );
    }
}
