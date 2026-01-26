import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function UseCases() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedUC, setExpandedUC] = useState(null);

  const categories = [
    {
      id: 'agent-lifecycle',
      name: 'Agent Lifecycle',
      count: 16,
      description: 'Complete agent lifecycle from spawn to decommission, including rescue workflows for crashed agents.',
      useCases: [
        {
          id: 'UC-AL-001',
          title: 'Agent Spawn',
          status: 'EXISTING',
          trigger: 'User runs claude in iTerm2',
          flow: ['Claude Code starts', 'SessionStart hook fires', 'Hook assigns GUID to agent'],
          components: ['iTerm2', 'Claude Code', 'SessionStart Hook'],
          data: 'GUID generated (not yet in DB)'
        },
        {
          id: 'UC-AL-002',
          title: 'Agent Checkin',
          status: 'EXISTING',
          trigger: 'Agent runs /checkin ROLE PROJECT',
          flow: ['Agent calls MCP tool checkin_agent()', 'MCP inserts into agents table', 'MCP logs SPAWNED to IDLE transition', 'Returns agent_id'],
          components: ['Agent', 'MCP', 'PostgreSQL'],
          data: 'agents, lifecycle_log'
        },
        {
          id: 'UC-AL-003',
          title: 'Agent State Transition',
          status: 'EXISTING',
          trigger: 'Agent starts task',
          flow: ['Agent calls MCP state transition', 'MCP updates lifecycle_log'],
          components: ['Agent', 'MCP', 'PostgreSQL'],
          data: 'lifecycle_log'
        },
        {
          id: 'UC-AL-004',
          title: 'Agent Handoff',
          status: 'EXISTING',
          trigger: 'Agent runs /handoff',
          flow: ['Agent calls MCP tool handoff_agent()', 'MCP saves context to handoffs table', 'MCP transitions to OFFLINE', 'Returns handoff_id'],
          components: ['Agent', 'MCP', 'PostgreSQL'],
          data: 'handoffs, lifecycle_log'
        },
        {
          id: 'UC-AL-005',
          title: 'Agent Recovery',
          status: 'EXISTING',
          trigger: 'Agent runs /recover GUID',
          flow: ['Agent calls MCP tool recover_agent()', 'MCP retrieves handoff from DB', 'MCP transitions to IDLE', 'Returns context data'],
          components: ['Agent', 'MCP', 'PostgreSQL'],
          data: 'handoffs, agents, lifecycle_log'
        },
        {
          id: 'UC-AL-006',
          title: 'Agent Checkout',
          status: 'EXISTING',
          trigger: 'Agent session ends normally',
          flow: ['Agent calls MCP tool checkout_agent()', 'MCP transitions to OFFLINE'],
          components: ['Agent', 'MCP', 'PostgreSQL'],
          data: 'lifecycle_log'
        },
        {
          id: 'UC-AL-007',
          title: 'Agent Decommission',
          status: 'EXISTING',
          trigger: 'User clicks Decommission in IDE',
          flow: ['IDE calls POST /api/agents/decommission', 'API sets decommissioned_at timestamp', 'API archives active handoffs'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'agents, handoffs'
        },
        {
          id: 'UC-AL-008a',
          title: 'Initiate Rescue Operation',
          status: 'EXISTING',
          trigger: 'Rescuer agent detects crashed agent',
          flow: ['Rescuer calls mcp__agent-state__initiate_rescue', 'MCP creates rescue operation record', 'Returns rescue_id'],
          components: ['Rescuer Agent', 'MCP', 'PostgreSQL'],
          data: 'rescue_operations (insert)'
        },
        {
          id: 'UC-AL-008b',
          title: 'Force Agent Offline',
          status: 'EXISTING',
          trigger: 'Rescue operation initiated',
          flow: ['Rescuer calls mcp__agent-state__force_offline', 'MCP transitions crashed agent to OFFLINE', 'Logs transition with reason=CRASH'],
          components: ['Rescuer Agent', 'MCP', 'PostgreSQL'],
          data: 'agents, lifecycle_log (update)'
        },
        {
          id: 'UC-AL-008c',
          title: 'Create Synthetic Handoff',
          status: 'EXISTING',
          trigger: 'Crashed agent now offline',
          flow: ['Rescuer analyzes crash artifacts', 'Rescuer calls mcp__agent-state__create_synthetic_handoff', 'MCP creates handoff record with reconstructed context'],
          components: ['Rescuer Agent', 'MCP', 'PostgreSQL'],
          data: 'handoffs (insert)'
        },
        {
          id: 'UC-AL-008d',
          title: 'Complete Rescue Operation',
          status: 'EXISTING',
          trigger: 'Synthetic handoff created (or rescue failed)',
          flow: ['Rescuer calls mcp__agent-state__complete_rescue', 'MCP marks rescue complete or failed', 'New agent can now recover'],
          components: ['Rescuer Agent', 'MCP', 'PostgreSQL'],
          data: 'rescue_operations (update)'
        },
        {
          id: 'UC-AL-009',
          title: 'Rename Agent',
          status: 'EXISTING',
          trigger: 'User edits name in AgentDetailPopup',
          flow: ['IDE calls PATCH /api/agents/name', 'API calls agent_lifecycle.set_display_name()', 'Updates display_name in agents table'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'agents.display_name (update)'
        },
        {
          id: 'UC-AL-010',
          title: 'View Valid State Transitions',
          status: 'EXISTING',
          trigger: 'IDE queries available transitions',
          flow: ['IDE calls GET /api/agents/:id/transition', 'API returns valid transitions from current state'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'lifecycle state machine rules (read)'
        },
        {
          id: 'UC-AL-011',
          title: 'IDE-Triggered State Transition',
          status: 'EXISTING',
          trigger: 'User triggers state change from IDE',
          flow: ['IDE calls POST /api/agents/:id/transition', 'API validates and executes transition', 'Logs to lifecycle_log'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'agents, lifecycle_log (update)'
        },
        {
          id: 'UC-AL-012',
          title: 'Update Handoff Status',
          status: 'EXISTING',
          trigger: 'IDE updates handoff state',
          flow: ['IDE calls PATCH /api/agents/handoff-status', 'API updates handoff status'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'handoffs.status (update)'
        },
        {
          id: 'UC-AL-013',
          title: 'Cleanup Orphan Agents',
          status: 'EXISTING',
          trigger: 'Maintenance or manual cleanup',
          flow: ['IDE calls PATCH /api/agents/lifecycle with action=EXIT', 'API identifies orphan SPAWNED agents', 'Transitions to OFFLINE with cleanup reason'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'agents, lifecycle_log (update)'
        },
      ]
    },
    {
      id: 'ide-monitoring',
      name: 'IDE Monitoring',
      count: 10,
      description: 'Real-time visibility into agent activity, health, and context usage through the desktop IDE.',
      useCases: [
        {
          id: 'UC-IM-001',
          title: 'View Agent List',
          status: 'EXISTING',
          trigger: 'User opens IDE / AgentPanel loads',
          flow: ['AgentPanel calls GET /api/agents', 'API queries agents + context_snapshots + handoffs', 'Returns enriched agent list', 'AgentPanel renders list'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'agents, context_snapshots, handoffs (read)'
        },
        {
          id: 'UC-IM-002',
          title: 'Poll Agent Updates',
          status: 'EXISTING',
          trigger: '10-second interval',
          flow: ['Same as UC-IM-001, repeats every 10s'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'agents, context_snapshots, handoffs (read)'
        },
        {
          id: 'UC-IM-003',
          title: 'Filter Agents by Health',
          status: 'EXISTING',
          trigger: 'User selects health filter dropdown',
          flow: ['AgentPanel filters in-memory', 'Displays filtered list'],
          components: ['IDE (client-side)'],
          data: 'None (filter applied to cached data)'
        },
        {
          id: 'UC-IM-004',
          title: 'Sort Agents',
          status: 'EXISTING',
          trigger: 'User selects sort option',
          flow: ['AgentPanel sorts in-memory', 'Displays sorted list'],
          components: ['IDE (client-side)'],
          data: 'None (sort applied to cached data)'
        },
        {
          id: 'UC-IM-005',
          title: 'View Agent Details',
          status: 'EXISTING',
          trigger: 'User clicks agent row',
          flow: ['AgentPanel shows AgentDetailPopup', 'Popup displays cached agent data'],
          components: ['IDE (client-side)'],
          data: 'None (uses cached data)'
        },
        {
          id: 'UC-IM-006',
          title: 'View Lifecycle History',
          status: 'EXISTING',
          trigger: 'User requests lifecycle in detail popup',
          flow: ['IDE calls GET /api/agents/lifecycle?guid=X', 'API queries lifecycle_log', 'Returns state history'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'lifecycle_log (read)'
        },
        {
          id: 'UC-IM-007',
          title: 'View Agent Messages',
          status: 'EXISTING',
          trigger: 'User opens agent mailbox',
          flow: ['IDE calls GET /api/agents/mailbox?guid=X', 'API queries messages table', 'Returns message list'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'messages (read)'
        },
        {
          id: 'UC-IM-008',
          title: 'View Handoff Status',
          status: 'EXISTING',
          trigger: 'Check if agent has active handoff',
          flow: ['IDE calls GET /api/agents/handoff-status?guid=X', 'API queries handoffs table', 'Returns handoff details or null'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'handoffs (read)'
        },
        {
          id: 'UC-IM-009',
          title: 'List Handoffs',
          status: 'EXISTING',
          trigger: 'User views handoff history',
          flow: ['IDE calls GET /api/handoffs', 'API queries handoffs table', 'Returns handoff list'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'handoffs (read)'
        },
        {
          id: 'UC-IM-010',
          title: 'List Senior Agents',
          status: 'EXISTING',
          trigger: 'IDE queries senior identities',
          flow: ['IDE calls GET /api/senior-agents', 'API queries senior_identities table', 'Returns senior agent list'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'senior_identities (read)'
        },
      ]
    },
    {
      id: 'terminal-control',
      name: 'Terminal Control',
      count: 5,
      description: 'Direct control over agent terminals including focus, read, send commands, and automated workflows.',
      useCases: [
        {
          id: 'UC-TC-001',
          title: 'Focus Agent Terminal',
          status: 'EXISTING',
          trigger: 'User double-clicks agent row',
          flow: ['AgentPanel calls POST /api/agents/focus-terminal', 'API spawns focus-iterm.py with PID', 'Script uses iterm_backend to find session', 'Script activates session'],
          components: ['IDE', 'API', 'Python', 'iTerm2'],
          data: 'None (terminal operation)'
        },
        {
          id: 'UC-TC-002',
          title: 'Peek Terminal Content',
          status: 'EXISTING',
          trigger: 'User clicks Peek button in detail popup',
          flow: ['IDE calls POST /api/agents/peek-terminal', 'API spawns read-iterm.py with PID', 'Script uses iterm_backend to read screen', 'Returns terminal content'],
          components: ['IDE', 'API', 'Python', 'iTerm2'],
          data: 'Terminal screen content (ephemeral)'
        },
        {
          id: 'UC-TC-003',
          title: 'Send to Terminal',
          status: 'EXISTING',
          trigger: 'User sends command from IDE',
          flow: ['IDE calls POST /api/agents/send-terminal', 'API spawns send-iterm.py with PID and text', 'Script uses iterm_backend to send text'],
          components: ['IDE', 'API', 'Python', 'iTerm2'],
          data: 'None (terminal operation)'
        },
        {
          id: 'UC-TC-004',
          title: 'Run Handoff Cycle',
          status: 'EXISTING',
          trigger: 'User selects "Run Handoff Cycle" from context menu',
          flow: ['AgentPanel calls POST /api/agents/orchestrate-handoff', 'API spawns orchestrate-handoff.py', 'Script sends /handoff to terminal', 'Script waits for handoff completion (polls DB)', 'Script sends /recover GUID to terminal', 'Returns success/failure'],
          components: ['IDE', 'API', 'Python', 'iTerm2', 'PostgreSQL'],
          data: 'handoffs (polled for completion)'
        },
        {
          id: 'UC-TC-005',
          title: 'Create Terminal Window/Tab',
          status: 'EXISTING',
          trigger: 'Restart workflow or manual creation',
          flow: ['Script calls iterm_backend.create_window()', 'Script calls iterm_backend.create_tab()', 'iTerm2 creates window/tab'],
          components: ['Python', 'iTerm2'],
          data: 'None (terminal operation)'
        },
      ]
    },
    {
      id: 'messaging',
      name: 'Messaging',
      count: 8,
      description: 'Inter-agent communication with threading, read receipts, and user inbox integration.',
      useCases: [
        {
          id: 'UC-MSG-001',
          title: 'Agent Sends Message',
          status: 'EXISTING',
          trigger: 'Agent calls MCP send_message tool',
          flow: ['Agent calls mcp__agent-state__send_message', 'MCP inserts into messages table', 'Returns message_id'],
          components: ['Agent', 'MCP', 'PostgreSQL'],
          data: 'messages (write)'
        },
        {
          id: 'UC-MSG-002',
          title: 'Agent Checks Inbox',
          status: 'EXISTING',
          trigger: 'Agent calls MCP get_inbox tool',
          flow: ['Agent calls mcp__agent-state__get_inbox', 'MCP queries messages table', 'Returns message list'],
          components: ['Agent', 'MCP', 'PostgreSQL'],
          data: 'messages (read)'
        },
        {
          id: 'UC-MSG-003',
          title: 'Agent Reads Message',
          status: 'EXISTING',
          trigger: 'Agent calls MCP read_message tool',
          flow: ['Agent calls mcp__agent-state__read_message', 'MCP retrieves message and marks READ', 'Returns full message content'],
          components: ['Agent', 'MCP', 'PostgreSQL'],
          data: 'messages (read + update status)'
        },
        {
          id: 'UC-MSG-004',
          title: 'User Views Mailbox',
          status: 'EXISTING',
          trigger: 'User opens mailbox in IDE',
          flow: ['IDE calls GET /api/user/mailbox', 'API queries messages for USER recipient', 'Returns message list'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'messages (read)'
        },
        {
          id: 'UC-MSG-005',
          title: 'User Marks Message Read',
          status: 'EXISTING',
          trigger: 'User opens message in IDE',
          flow: ['IDE calls POST /api/user/mailbox/:id/read', 'API updates message status to READ', 'Returns updated message'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'messages.status (update)'
        },
        {
          id: 'UC-MSG-006',
          title: 'Fetch Thread Messages',
          status: 'EXISTING',
          trigger: 'User views message thread in IDE',
          flow: ['IDE calls GET /api/messages?threadId=X', 'API queries messages by thread', 'Returns threaded message list'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'messages (read)'
        },
        {
          id: 'UC-MSG-007',
          title: 'Create Thread Message',
          status: 'EXISTING',
          trigger: 'User posts message from IDE',
          flow: ['IDE calls POST /api/messages', 'API creates message record', 'Returns message_id'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'messages (insert)'
        },
        {
          id: 'UC-MSG-008',
          title: 'Delete Agent Message',
          status: 'EXISTING',
          trigger: 'User deletes message from mailbox',
          flow: ['IDE calls DELETE /api/agents/mailbox', 'API soft-deletes or archives message', 'Returns success'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'messages (soft delete)'
        },
      ]
    },
    {
      id: 'context-monitoring',
      name: 'Context Monitoring',
      count: 6,
      description: 'Track token usage across agents with real-time gauges and proactive alerts before context limits.',
      useCases: [
        {
          id: 'UC-CM-001',
          title: 'Daemon Captures Context',
          status: 'EXISTING',
          trigger: 'Session file changes (continuous)',
          flow: ['context_daemon watches ~/.claude/projects/', 'Daemon parses JSONL for token counts', 'Daemon links session to agent via PID/GUID', 'Daemon inserts into context_snapshots'],
          components: ['Session Files', 'Daemon', 'PostgreSQL'],
          data: 'context_snapshots (write)'
        },
        {
          id: 'UC-CM-002',
          title: 'IDE Displays Context Gauge',
          status: 'EXISTING',
          trigger: 'Agent list poll (every 10s)',
          flow: ['GET /api/agents joins context_snapshots', 'Returns context_percent_used', 'AgentPanel renders gauge with color'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'context_snapshots (read via agents query)'
        },
        {
          id: 'UC-CM-003',
          title: 'Context Alert',
          status: 'EXISTING',
          trigger: 'Context exceeds threshold',
          flow: ['Daemon detects high context', 'Daemon updates health_status', 'IDE displays warning color'],
          components: ['Daemon', 'PostgreSQL', 'IDE'],
          data: 'context_snapshots, health_status'
        },
        {
          id: 'UC-CM-004',
          title: 'Manual Context Refresh',
          status: 'NEW',
          trigger: 'User or system requests refresh',
          flow: ['Trigger sent to context daemon', 'Daemon re-parses session files', 'Updates context_snapshots'],
          components: ['API/Script', 'Daemon', 'PostgreSQL'],
          data: 'context_snapshots (update)'
        },
        {
          id: 'UC-CM-005',
          title: 'Session File Not Found',
          status: 'NEW',
          trigger: 'Daemon cannot locate expected session file',
          flow: ['Daemon detects missing file for active agent', 'Logs warning', 'Marks context as stale or unknown'],
          components: ['Daemon', 'Filesystem', 'PostgreSQL'],
          data: 'context_snapshots (update with stale flag)'
        },
        {
          id: 'UC-CM-006',
          title: 'Daemon Restart Recovery',
          status: 'NEW',
          trigger: 'Daemon process restarts',
          flow: ['Daemon initializes, scans all session directories', 'Re-establishes file watches', 'Performs full sync of context data'],
          components: ['Daemon', 'Filesystem', 'PostgreSQL'],
          data: 'context_snapshots (bulk update)'
        },
      ]
    },
    {
      id: 'health-monitoring',
      name: 'Health Monitoring',
      count: 5,
      description: 'System-wide health checks for database, network, terminal, and context monitoring services.',
      useCases: [
        {
          id: 'UC-HM-001',
          title: 'Database Health Check',
          status: 'EXISTING',
          trigger: 'IDE health dashboard / monitoring',
          flow: ['IDE calls GET /api/health/db', 'API tests database connection', 'Returns status (ok/error)'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'None (connection test)'
        },
        {
          id: 'UC-HM-002',
          title: 'Network Health Check',
          status: 'EXISTING',
          trigger: 'IDE health dashboard / monitoring',
          flow: ['IDE calls GET /api/health/net', 'API tests network connectivity', 'Returns status'],
          components: ['IDE', 'API', 'External'],
          data: 'None (connectivity test)'
        },
        {
          id: 'UC-HM-003',
          title: 'PTY Health Check',
          status: 'EXISTING',
          trigger: 'IDE health dashboard / monitoring',
          flow: ['IDE calls GET /api/health/pty', 'API tests terminal connectivity', 'Returns status'],
          components: ['IDE', 'API', 'iTerm2'],
          data: 'None (terminal test)'
        },
        {
          id: 'UC-HM-004',
          title: 'Context Monitor Health',
          status: 'EXISTING',
          trigger: 'IDE health dashboard / monitoring',
          flow: ['IDE calls GET /api/health/cmon', 'API checks daemon status', 'Returns status'],
          components: ['IDE', 'API', 'Daemon'],
          data: 'Daemon process status'
        },
        {
          id: 'UC-HM-005',
          title: 'Context API Check',
          status: 'EXISTING',
          trigger: 'IDE health dashboard / monitoring',
          flow: ['IDE calls GET /api/health/context', 'API returns context snapshot stats', 'Returns latest snapshot info'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'context_snapshots (read)'
        },
      ]
    },
    {
      id: 'file-operations',
      name: 'File Operations',
      count: 2,
      description: 'Secure file listing and reading with role-based access controls.',
      useCases: [
        {
          id: 'UC-FO-001',
          title: 'List Files',
          status: 'EXISTING',
          trigger: 'IDE file browser',
          flow: ['IDE calls GET /api/files/list?path=X', 'API lists directory contents', 'Returns file/folder list'],
          components: ['IDE', 'API', 'Filesystem'],
          data: 'Directory listing'
        },
        {
          id: 'UC-FO-002',
          title: 'Read File',
          status: 'EXISTING',
          trigger: 'IDE file viewer/editor',
          flow: ['IDE calls GET /api/files/read?path=X', 'API reads file contents', 'Returns file content'],
          components: ['IDE', 'API', 'Filesystem'],
          data: 'File contents'
        },
      ]
    },
    {
      id: 'external-services',
      name: 'External Services',
      count: 4,
      description: 'Integration with Slack for notifications and bidirectional communication.',
      useCases: [
        {
          id: 'UC-EXT-001',
          title: 'Post Message to Slack',
          status: 'EXISTING',
          trigger: 'Agent message flagged for Slack delivery',
          flow: ['slack_bridge.py monitors message queue', 'Formats message for Slack', 'Posts to configured Slack channel'],
          components: ['Daemon (slack_bridge)', 'PostgreSQL', 'Slack API'],
          data: 'messages (read), Slack webhook'
        },
        {
          id: 'UC-EXT-002',
          title: 'Receive Slack Message',
          status: 'EXISTING',
          trigger: 'Message posted in Slack channel',
          flow: ['Slack webhook triggers slack_bridge.py', 'Bridge parses message, identifies target agent', 'Inserts into messages table'],
          components: ['Slack API', 'Daemon (slack_bridge)', 'PostgreSQL'],
          data: 'messages (insert)'
        },
        {
          id: 'UC-NTF-001',
          title: 'Queue Notification',
          status: 'EXISTING',
          trigger: 'Event requiring user notification',
          flow: ['System creates notification record', 'notification_daemon.py picks up from queue', 'Holds until delivery conditions met'],
          components: ['System', 'PostgreSQL', 'Daemon'],
          data: 'notifications queue (insert)'
        },
        {
          id: 'UC-NTF-002',
          title: 'Deliver Notification',
          status: 'EXISTING',
          trigger: 'Agent goes IDLE or conditions met',
          flow: ['notification_daemon.py detects delivery window', 'Delivers notification (desktop, sound, etc.)', 'Marks notification as delivered'],
          components: ['Daemon', 'PostgreSQL', 'System'],
          data: 'notifications (update)'
        },
      ]
    },
    {
      id: 'error-handling',
      name: 'Error Handling',
      count: 4,
      status: 'PROPOSED',
      description: 'Standardized error handling patterns for API timeouts, database failures, and MCP tool errors.',
      useCases: [
        {
          id: 'UC-ERR-001',
          title: 'Handle API Timeout',
          status: 'PROPOSED',
          trigger: 'API call exceeds timeout threshold',
          flow: ['Client detects timeout (AbortController)', 'Logs error, shows user message', 'Optionally retries or fails gracefully'],
          components: ['IDE', 'API'],
          data: 'None (error handling)'
        },
        {
          id: 'UC-ERR-002',
          title: 'Handle Database Connection Failure',
          status: 'PROPOSED',
          trigger: 'Database unreachable',
          flow: ['API catches connection error', 'Returns 503 Service Unavailable', 'IDE shows database error state'],
          components: ['API', 'PostgreSQL'],
          data: 'None (error handling)'
        },
        {
          id: 'UC-ERR-003',
          title: 'Handle iTerm2 Connection Failure',
          status: 'PROPOSED',
          trigger: 'iTerm2 API unreachable',
          flow: ['Python script catches connection error', 'Returns error to API', 'IDE shows terminal unavailable'],
          components: ['Python', 'iTerm2'],
          data: 'None (error handling)'
        },
        {
          id: 'UC-ERR-004',
          title: 'Handle MCP Tool Failure',
          status: 'PROPOSED',
          trigger: 'MCP tool call fails',
          flow: ['Agent receives error from MCP', 'Agent logs error, may retry', 'Agent reports to user or escalates'],
          components: ['Agent', 'MCP'],
          data: 'None (error handling)'
        },
      ]
    },
    {
      id: 'groups-management',
      name: 'Groups Management',
      count: 9,
      status: 'PROPOSED',
      description: 'Database-backed agent grouping for organized workflows and fleet restart capabilities.',
      useCases: [
        {
          id: 'UC-GRP-001',
          title: 'List Groups',
          status: 'PROPOSED',
          trigger: 'AgentPanel loads',
          flow: ['IDE calls GET /api/groups', 'API calls get_all_groups() function', 'Returns groups with member counts', 'AgentPanel renders group sections'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'agent_groups, agent_group_members (read)'
        },
        {
          id: 'UC-GRP-002',
          title: 'Create Group',
          status: 'PROPOSED',
          trigger: 'User enters name and clicks Add',
          flow: ['IDE calls POST /api/groups with name, color', 'API calls create_agent_group() function', 'Returns new group_id', 'AgentPanel refreshes'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'agent_groups (insert)'
        },
        {
          id: 'UC-GRP-003',
          title: 'Rename Group',
          status: 'PROPOSED',
          trigger: 'User edits group name',
          flow: ['IDE calls PUT /api/groups/:id with new name', 'API calls update_agent_group() function', 'Returns success'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'agent_groups (update)'
        },
        {
          id: 'UC-GRP-004',
          title: 'Delete Group',
          status: 'PROPOSED',
          trigger: 'User clicks delete on group',
          flow: ['IDE calls DELETE /api/groups/:id', 'API calls delete_agent_group() (soft delete)', 'Sets deleted_at timestamp'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'agent_groups (soft delete)'
        },
        {
          id: 'UC-GRP-005',
          title: 'Add Agent to Group',
          status: 'PROPOSED',
          trigger: 'User adds agent in group manager',
          flow: ['IDE calls POST /api/groups/:id/members with agent_guid', 'API calls add_agent_to_group() function', 'Creates membership with joined_at'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'agent_group_members (insert)'
        },
        {
          id: 'UC-GRP-006',
          title: 'Remove Agent from Group',
          status: 'PROPOSED',
          trigger: 'User removes agent from group',
          flow: ['IDE calls DELETE /api/groups/:id/members/:guid', 'API calls remove_agent_from_group() (soft delete)', 'Sets removed_at, removed_by, removal_reason'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'agent_group_members (soft delete)'
        },
        {
          id: 'UC-GRP-007',
          title: 'Bulk Add Agents',
          status: 'PROPOSED',
          trigger: 'User pastes agent names and clicks Add',
          flow: ['IDE parses input text', 'IDE matches against known agents', 'IDE calls POST /api/groups/:id/members for each'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'agent_group_members (multiple inserts)'
        },
        {
          id: 'UC-GRP-008',
          title: 'Reorder Agents in Group',
          status: 'PROPOSED',
          trigger: 'User drags agent to new position',
          flow: ['IDE calls PUT /api/groups/:id/members/order with ordered GUIDs', 'API calls reorder_group_members() function', 'Updates tab_position values'],
          components: ['IDE', 'API', 'PostgreSQL'],
          data: 'agent_group_members (update positions)'
        },
        {
          id: 'UC-GRP-009',
          title: 'Toggle Group Collapsed',
          status: 'EXISTING',
          trigger: 'User clicks group header',
          flow: ['AgentPanel toggles collapsed state', 'Saves to localStorage', 'Re-renders expanded/collapsed'],
          components: ['IDE (client-side)'],
          data: 'localStorage (UI preference)'
        },
      ]
    },
    {
      id: 'restart-workflow',
      name: 'Restart Workflow',
      count: 4,
      status: 'PROPOSED',
      description: 'Automated agent fleet restart with layout preservation and session recovery.',
      useCases: [
        {
          id: 'UC-RST-001',
          title: 'Capture Current Layout',
          status: 'PROPOSED',
          trigger: 'Before restart or manual capture',
          flow: ['Script calls iterm_backend.get_layout()', 'Returns all windows with tabs and PIDs', 'Script matches PIDs to agent GUIDs', 'Script updates session_id in DB'],
          components: ['Python', 'iTerm2', 'PostgreSQL'],
          data: 'agent_group_members.session_id (update)'
        },
        {
          id: 'UC-RST-002',
          title: 'Get Layout for Restart',
          status: 'PROPOSED',
          trigger: 'Restart script starts',
          flow: ['Script calls GET /api/groups/layout', 'API calls get_group_layout() function', 'Returns groups with ordered agents'],
          components: ['Python', 'API', 'PostgreSQL'],
          data: 'agent_groups, agent_group_members, agents (read)'
        },
        {
          id: 'UC-RST-003',
          title: 'Restore Single Group',
          status: 'PROPOSED',
          trigger: 'For each group in layout',
          flow: ['Script creates window with group.window_title', 'For each agent: create tab, send /recover GUID', 'Script updates session_id in DB'],
          components: ['Python', 'iTerm2', 'PostgreSQL'],
          data: 'agent_group_members.session_id (update)'
        },
        {
          id: 'UC-RST-004',
          title: 'Full Fleet Restart',
          status: 'PROPOSED',
          trigger: 'User runs restart-agents.py',
          flow: ['Execute get layout', 'For each group: restore group', 'For ungrouped: create Ungrouped window, recover', 'Report success/failure'],
          components: ['Python', 'API', 'PostgreSQL', 'iTerm2'],
          data: 'All groups data (read), session_ids (update)'
        },
      ]
    },
  ];

  const statusColors = {
    'EXISTING': '#16a34a',
    'NEW': '#2563eb',
    'PROPOSED': '#7c3aed'
  };

  const totalCount = categories.reduce((sum, cat) => sum + cat.count, 0);
  const existingCount = categories.reduce((sum, cat) =>
    sum + cat.useCases.filter(uc => uc.status === 'EXISTING').length, 0);
  const newCount = categories.reduce((sum, cat) =>
    sum + cat.useCases.filter(uc => uc.status === 'NEW').length, 0);
  const proposedCount = categories.reduce((sum, cat) =>
    sum + cat.useCases.filter(uc => uc.status === 'PROPOSED').length, 0);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedUC(null);
  };

  const toggleUC = (ucId) => {
    setExpandedUC(expandedUC === ucId ? null : ucId);
  };

  return (
    <Layout
      title="Use Cases"
      description="73 use cases across 11 categories covering agent lifecycle, monitoring, messaging, and more. See what AI-AMP can do."
    >
      {/* Hero */}
      <section className="hero hero-page">
        <div className="container">
          <h1>73 Use Cases. 11 Categories.</h1>
          <p>A comprehensive platform covering every aspect of multi-agent orchestration&mdash;from agent lifecycle to fleet management.</p>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="section">
        <div className="container">
          <div className="grid grid-4">
            <div className="card text-center">
              <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{totalCount}</h2>
              <p className="text-light mb-0">Total Use Cases</p>
            </div>
            <div className="card text-center">
              <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: statusColors.EXISTING }}>{existingCount}</h2>
              <p className="text-light mb-0">Existing (71%)</p>
            </div>
            <div className="card text-center">
              <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: statusColors.NEW }}>{newCount}</h2>
              <p className="text-light mb-0">New (8%)</p>
            </div>
            <div className="card text-center">
              <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: statusColors.PROPOSED }}>{proposedCount}</h2>
              <p className="text-light mb-0">Proposed (21%)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="text-center mb-lg">Use Case Categories</h2>
          <p className="text-center text-light mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
            Click a category to expand use cases. Click a use case to see trigger, flow, components, and data details.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {categories.map((category) => (
              <div key={category.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Category Header */}
                <div
                  onClick={() => toggleCategory(category.id)}
                  style={{
                    padding: 'var(--spacing-lg)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: expandedCategory === category.id ? 'var(--color-bg-alt)' : 'transparent',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <div>
                    <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>{category.name}</h3>
                    <p className="text-light mb-0">{category.description}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '4px',
                      backgroundColor: (statusColors[category.status] || statusColors.EXISTING) + '20',
                      color: statusColors[category.status] || statusColors.EXISTING,
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      whiteSpace: 'nowrap'
                    }}>
                      {category.count} Use Cases
                    </span>
                    <span style={{ fontSize: '1.5rem', color: 'var(--color-text-light)' }}>
                      {expandedCategory === category.id ? '\u2212' : '+'}
                    </span>
                  </div>
                </div>

                {/* Expanded Use Cases */}
                {expandedCategory === category.id && (
                  <div style={{ borderTop: '1px solid var(--color-border)' }}>
                    {category.useCases.map((uc) => (
                      <div key={uc.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        {/* UC Header */}
                        <div
                          onClick={() => toggleUC(uc.id)}
                          style={{
                            padding: 'var(--spacing-md) var(--spacing-lg)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-md)',
                            backgroundColor: expandedUC === uc.id ? 'var(--color-bg-alt)' : 'transparent',
                            transition: 'background-color 0.2s'
                          }}
                        >
                          <span style={{
                            fontSize: '0.75rem',
                            color: 'var(--color-text-light)',
                            fontFamily: 'monospace',
                            minWidth: '90px'
                          }}>
                            {uc.id}
                          </span>
                          <span style={{ flex: 1, fontWeight: '500' }}>{uc.title}</span>
                          <span style={{
                            fontSize: '0.7rem',
                            padding: '2px 8px',
                            borderRadius: '3px',
                            backgroundColor: statusColors[uc.status] + '20',
                            color: statusColors[uc.status]
                          }}>
                            {uc.status}
                          </span>
                          <span style={{ color: 'var(--color-text-light)' }}>
                            {expandedUC === uc.id ? '\u25B2' : '\u25BC'}
                          </span>
                        </div>

                        {/* UC Details */}
                        {expandedUC === uc.id && (
                          <div style={{
                            padding: 'var(--spacing-md) var(--spacing-lg)',
                            paddingLeft: 'calc(var(--spacing-lg) + 100px)',
                            backgroundColor: 'var(--color-bg)',
                            borderTop: '1px solid var(--color-border)'
                          }}>
                            <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                              <div>
                                <strong style={{ color: 'var(--color-primary)', fontSize: '0.875rem' }}>Trigger</strong>
                                <p style={{ margin: '4px 0 0 0' }}>{uc.trigger}</p>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--color-primary)', fontSize: '0.875rem' }}>Flow</strong>
                                <ol style={{ margin: '4px 0 0 0', paddingLeft: '1.5rem' }}>
                                  {uc.flow.map((step, i) => (
                                    <li key={i} style={{ marginBottom: '4px' }}>{step}</li>
                                  ))}
                                </ol>
                              </div>
                              <div style={{ display: 'flex', gap: 'var(--spacing-xl)' }}>
                                <div>
                                  <strong style={{ color: 'var(--color-primary)', fontSize: '0.875rem' }}>Components</strong>
                                  <p style={{ margin: '4px 0 0 0' }}>{uc.components.join(', ')}</p>
                                </div>
                                <div>
                                  <strong style={{ color: 'var(--color-primary)', fontSize: '0.875rem' }}>Data</strong>
                                  <p style={{ margin: '4px 0 0 0', fontFamily: 'monospace', fontSize: '0.875rem' }}>{uc.data}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>See AI-AMP in Action</h2>
          <p>73 use cases. Enterprise-grade orchestration. Full audit trails.</p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <Link href="/survey" className="btn btn-primary btn-large">Talk With Us</Link>
            <Link href="/product/overview" className="btn btn-secondary btn-large">Product Overview</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
